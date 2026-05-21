const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Ensure js-yaml is installed (self-bootstrapping script)
try {
  require('js-yaml');
} catch (e) {
  console.log('js-yaml not found, installing...');
  execSync('npm install js-yaml', { stdio: 'inherit' });
}
const yaml = require('js-yaml');

// Directory paths
const contentDir = process.argv[2] 
  ? path.resolve(process.argv[2]) 
  : path.resolve(__dirname, '../../quartz/content');

console.log(`Starting Obsidian Bases compilation in: ${contentDir}`);

if (!fs.existsSync(contentDir)) {
  console.error(`Error: Content directory does not exist at ${contentDir}`);
  process.exit(1);
}

// 1. Index all assets in the content folder recursively
function scanAssets(dir, assets = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      // Skip hidden folders like .obsidian
      if (!item.startsWith('.')) {
        scanAssets(fullPath, assets);
      }
    } else {
      const ext = path.extname(item).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.pdf'].includes(ext)) {
        assets.push({
          name: item,
          relativePath: path.relative(contentDir, fullPath)
        });
      }
    }
  }
  return assets;
}

const indexedAssets = scanAssets(contentDir);
console.log(`Indexed ${indexedAssets.length} asset files.`);

// 2. Index all markdown notes with their frontmatter
function scanNotes(dir, notes = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!item.startsWith('.')) {
        scanNotes(fullPath, notes);
      }
    } else if (item.endsWith('.md')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Parse frontmatter
      let frontmatter = {};
      let bodyContent = content;
      const fmMatch = content.match(/^---([\s\S]*?)---/);
      if (fmMatch) {
        try {
          frontmatter = yaml.load(fmMatch[1]) || {};
          bodyContent = content.substring(fmMatch[0].length);
        } catch (err) {
          console.warn(`Warning: Failed to parse frontmatter in ${fullPath}`);
        }
      }

      // Extract immediate parent folder name
      const parentFolder = path.basename(path.dirname(fullPath));

      // Extract tags (support both string list and single string)
      let tags = [];
      if (frontmatter.tags) {
        if (Array.isArray(frontmatter.tags)) {
          tags = frontmatter.tags.map(t => String(t).trim().toLowerCase());
        } else if (typeof frontmatter.tags === 'string') {
          tags = frontmatter.tags.split(',').map(t => t.trim().toLowerCase());
        }
      }

      // Check inline hashtags e.g. #my-tag (exclude inside code blocks)
      const inlineTags = bodyContent.match(/(?:^|\s)#([a-zA-Z0-9_\-/]+)/g);
      if (inlineTags) {
        inlineTags.forEach(match => {
          const cleanTag = match.trim().substring(1).toLowerCase();
          if (!tags.includes(cleanTag) && !['cite', 'ref'].includes(cleanTag)) {
            tags.push(cleanTag);
          }
        });
      }

      notes.push({
        name: path.basename(item, '.md'),
        relativePath: path.relative(contentDir, fullPath),
        folder: parentFolder,
        tags: tags,
        ctime: stat.birthtimeMs,
        mtime: stat.mtimeMs,
        frontmatter: frontmatter,
        content: content
      });
    }
  }
  return notes;
}

const indexedNotes = scanNotes(contentDir);
console.log(`Indexed ${indexedNotes.length} markdown notes.`);

// 3. Helper to resolve cover image path
function resolveCoverImage(coverValue, notePath) {
  if (!coverValue) return null;
  if (typeof coverValue === 'string' && (coverValue.startsWith('http://') || coverValue.startsWith('https://'))) {
    return coverValue;
  }
  
  // Extract file name from wikilink syntax like [[cover.png]]
  const match = String(coverValue).match(/\[\[([^\]]+)\]\]/);
  const filename = match ? match[1] : coverValue;
  
  // Find in indexed assets
  const asset = indexedAssets.find(a => a.name.toLowerCase() === filename.toLowerCase());
  if (asset) {
    const noteDepth = notePath.split(/[/\\]/).length - 1;
    const prefix = '../'.repeat(noteDepth);
    return prefix + asset.relativePath.replace(/\\/g, '/');
  }
  
  return null;
}

// 4. Helper to extract a text preview
function getPreviewText(content) {
  const cleanContent = content.replace(/^---[\s\S]*?---/, '');
  let text = cleanContent
    .replace(/#+\s+/g, '') // headers
    .replace(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, '$1') // wikilinks
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // standard links
    .replace(/[*_`~]/g, '') // markdown formatting
    .replace(/>\s*/g, '') // blockquotes
    .replace(/\s+/g, ' ') // collapse whitespaces
    .trim();
  
  if (text.length > 180) {
    return text.substring(0, 180) + '...';
  }
  return text || 'Click to view note details.';
}

// 5. Evaluate queries
function evaluateFilter(filterStr, note) {
  let isNegated = false;
  let expr = filterStr.trim();
  if (expr.startsWith('!')) {
    isNegated = true;
    expr = expr.substring(1).trim();
  }

  let result = false;

  // Folder check
  if (expr.includes('file.folder ==')) {
    const match = expr.match(/file\.folder\s*==\s*["']([^"']+)["']/);
    if (match) {
      const folderName = match[1].toLowerCase();
      result = note.folder.toLowerCase() === folderName;
    }
  }
  // ContainsAny check
  else if (expr.includes('file.tags.containsAny')) {
    const match = expr.match(/file\.tags\.containsAny\(([^)]+)\)/);
    if (match) {
      const tags = match[1].split(',').map(s => s.trim().replace(/["']/g, '').toLowerCase());
      result = note.tags.some(t => tags.includes(t));
    }
  }
  // Contains check
  else if (expr.includes('file.tags.contains')) {
    const match = expr.match(/file\.tags\.contains\(([^)]+)\)/);
    if (match) {
      const tag = match[1].replace(/["']/g, '').trim().toLowerCase();
      result = note.tags.includes(tag);
    }
  }
  // hasTag check
  else if (expr.includes('file.hasTag')) {
    const match = expr.match(/file\.hasTag\(([^)]+)\)/);
    if (match) {
      const tag = match[1].replace(/["']/g, '').trim().toLowerCase();
      result = note.tags.includes(tag);
    }
  }

  return isNegated ? !result : result;
}

function evaluateFilters(filterGroup, note) {
  if (!filterGroup) return true;
  
  if (filterGroup.and) {
    return filterGroup.and.every(f => evaluateFilter(f, note));
  }
  if (filterGroup.or) {
    return filterGroup.or.some(f => evaluateFilter(f, note));
  }
  if (Array.isArray(filterGroup)) {
    return filterGroup.every(f => evaluateFilter(f, note));
  }
  
  return true;
}

// 6. Sorting logic
function sortNotes(notes, orderArr) {
  if (!orderArr || orderArr.length === 0) return notes;
  
  return [...notes].sort((a, b) => {
    for (const key of orderArr) {
      let valA, valB;
      if (key === 'file.name') {
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
      } else if (key === 'file.ctime') {
        valA = a.ctime;
        valB = b.ctime;
      } else if (key === 'file.mtime') {
        valA = a.mtime;
        valB = b.mtime;
      } else if (key === 'tags') {
        valA = a.tags.join(',');
        valB = b.tags.join(',');
      } else {
        valA = String(a.frontmatter[key] || '').toLowerCase();
        valB = String(b.frontmatter[key] || '').toLowerCase();
      }
      
      if (valA < valB) return -1;
      if (valA > valB) return 1;
    }
    return 0;
  });
}

// 7. Find and compile all .base files
function compileBases(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!item.startsWith('.')) {
        compileBases(fullPath);
      }
    } else if (item.endsWith('.base')) {
      const mdPath = fullPath.replace(/\.base$/, '.md');
      console.log(`Compiling base config: ${fullPath} -> ${mdPath}`);
      
      const fileContent = fs.readFileSync(fullPath, 'utf8');
      let baseConfig;
      try {
        baseConfig = yaml.load(fileContent);
      } catch (err) {
        console.error(`Error parsing YAML in ${fullPath}:`, err);
        continue;
      }

      if (!baseConfig || !baseConfig.views) {
        console.warn(`Warning: No views found in ${fullPath}`);
        continue;
      }

      let markdownOutput = `---\ntitle: "${path.basename(item, '.base')}"\n---\n\n`;
      
      // Inject gorgeous dynamic custom style block
      markdownOutput += `<style>
.base-container {
  margin: 2.5rem 0;
  font-family: inherit;
}
.base-view-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
  border-bottom: 2px solid var(--lightgray);
  padding-bottom: 0.5rem;
  color: var(--dark);
}
.base-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}
.base-card {
  background: var(--light);
  border: 1px solid var(--lightgray);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  text-decoration: none !important;
  color: var(--dark) !important;
}
.base-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  border-color: var(--secondary) !important;
}
.base-card-image {
  width: 100%;
  aspect-ratio: 1.6;
  object-fit: cover;
  background: var(--lightgray);
  border-bottom: 1px solid var(--lightgray);
}
.base-card-placeholder {
  width: 100%;
  aspect-ratio: 1.6;
  background: linear-gradient(135deg, var(--lightgray) 0%, rgba(226, 232, 240, 0.5) 100%);
  border-bottom: 1px solid var(--lightgray);
  position: relative;
  overflow: hidden;
}
.base-card-placeholder::before {
  content: "📝";
  font-size: 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.4;
}
.base-card-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.base-card-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--dark);
}
.base-card-preview {
  font-size: 0.85rem;
  color: var(--gray);
  margin-bottom: 1rem;
  flex-grow: 1;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.base-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.base-card-tag {
  font-size: 0.7rem;
  background: var(--lightgray);
  color: var(--darkgray);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  text-decoration: none !important;
}
.base-table-container {
  overflow-x: auto;
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  margin: 1.5rem 0;
}
.base-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}
.base-table th, .base-table td {
  border-bottom: 1px solid var(--lightgray);
  padding: 0.75rem 1rem;
  text-align: left;
}
.base-table th {
  background: var(--lightgray);
  font-weight: 600;
  color: var(--dark);
}
.base-table tr:last-child td {
  border-bottom: none;
}
.base-table tr:hover {
  background: rgba(0, 0, 0, 0.015);
}
.base-link {
  color: var(--secondary);
  text-decoration: none;
  font-weight: 500;
}
.base-link:hover {
  text-decoration: underline;
}
</style>\n\n`;

      for (const view of baseConfig.views) {
        // Filter notes
        let matched = indexedNotes.filter(note => evaluateFilters(note.relativePath.startsWith(path.relative(contentDir, path.dirname(fullPath))) ? view.filters : null, note));
        
        // Ensure files only match if they pass filters
        matched = indexedNotes.filter(note => evaluateFilters(view.filters, note));
        
        // Sort notes
        matched = sortNotes(matched, view.order);

        markdownOutput += `<div class="base-container">\n`;
        markdownOutput += `  <div class="base-view-title">${view.name}</div>\n`;

        if (matched.length === 0) {
          markdownOutput += `  <p style="color: var(--gray); font-style: italic;">No matching notes found.</p>\n`;
        } else if (view.type === 'cards') {
          markdownOutput += `  <div class="base-grid">\n`;
          for (const note of matched) {
            // Build direct relative link from the .base note location to the target note
            const currentDirName = path.dirname(mdPath);
            const targetNoteAbs = path.join(contentDir, note.relativePath);
            let relativeLink = path.relative(currentDirName, targetNoteAbs).replace(/\\/g, '/');
            // Remove .md extension for Quartz routing
            relativeLink = relativeLink.replace(/\.md$/, '');
            
            // Resolve cover
            const coverImage = note.frontmatter.cover 
              ? resolveCoverImage(note.frontmatter.cover, relativeLink) 
              : null;

            const preview = getPreviewText(note.content);
            const title = note.frontmatter.title || note.name;

            markdownOutput += `    <a href="${relativeLink}" class="base-card">\n`;
            if (coverImage) {
              markdownOutput += `      <img class="base-card-image" src="${coverImage}" alt="${title} cover" />\n`;
            } else {
              markdownOutput += `      <div class="base-card-placeholder"></div>\n`;
            }
            markdownOutput += `      <div class="base-card-content">\n`;
            markdownOutput += `        <div class="base-card-title">${title}</div>\n`;
            markdownOutput += `        <div class="base-card-preview">${preview}</div>\n`;
            
            if (note.tags.length > 0) {
              markdownOutput += `        <div class="base-card-tags">\n`;
              for (const tag of note.tags.slice(0, 3)) {
                markdownOutput += `          <span class="base-card-tag">#${tag}</span>\n`;
              }
              markdownOutput += `        </div>\n`;
            }
            
            markdownOutput += `      </div>\n`;
            markdownOutput += `    </a>\n`;
          }
          markdownOutput += `  </div>\n`;
        } else {
          // Table view
          markdownOutput += `  <div class="base-table-container">\n`;
          markdownOutput += `    <table class="base-table">\n`;
          markdownOutput += `      <thead>\n`;
          markdownOutput += `        <tr>\n`;
          markdownOutput += `          <th>Name</th>\n`;
          markdownOutput += `          <th>Tags</th>\n`;
          markdownOutput += `          <th>Last Modified</th>\n`;
          markdownOutput += `        </tr>\n`;
          markdownOutput += `      </thead>\n`;
          markdownOutput += `      <tbody>\n`;
          
          for (const note of matched) {
            const currentDirName = path.dirname(mdPath);
            const targetNoteAbs = path.join(contentDir, note.relativePath);
            let relativeLink = path.relative(currentDirName, targetNoteAbs).replace(/\\/g, '/').replace(/\.md$/, '');
            const title = note.frontmatter.title || note.name;
            const formattedTags = note.tags.map(t => `#${t}`).join(', ') || '—';
            const mtimeString = new Date(note.mtime).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            });

            markdownOutput += `        <tr>\n`;
            markdownOutput += `          <td><a class="base-link" href="${relativeLink}">${title}</a></td>\n`;
            markdownOutput += `          <td style="color: var(--darkgray);">${formattedTags}</td>\n`;
            markdownOutput += `          <td style="color: var(--gray);">${mtimeString}</td>\n`;
            markdownOutput += `        </tr>\n`;
          }
          
          markdownOutput += `      </tbody>\n`;
          markdownOutput += `    </table>\n`;
          markdownOutput += `  </div>\n`;
        }
        
        markdownOutput += `</div>\n\n`;
      }

      fs.writeFileSync(mdPath, markdownOutput, 'utf8');
      
      // Delete the .base file from content/ folder to prevent build issues
      try {
        fs.unlinkSync(fullPath);
        console.log(`Removed base config from compilation directory: ${fullPath}`);
      } catch (err) {
        console.error(`Failed to delete ${fullPath}:`, err);
      }
    }
  }
}

compileBases(contentDir);
console.log('Bases compilation finished successfully!');
