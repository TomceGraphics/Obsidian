const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const password = process.env.SITE_PASSWORD || '999305';
const publicDir = process.argv[2] 
  ? path.resolve(process.argv[2]) 
  : path.resolve(__dirname, '../../quartz/public');

console.log(`Starting Pagecrypt encryption on: ${publicDir}`);

if (!fs.existsSync(publicDir)) {
  console.error(`Error: Output directory does not exist at ${publicDir}`);
  process.exit(1);
}

// Ensure pagecrypt is installed (self-bootstrapping script)
try {
  execSync('npx pagecrypt --version', { stdio: 'ignore' });
} catch (e) {
  console.log('pagecrypt not found, installing locally...');
  execSync('npm install pagecrypt', { stdio: 'inherit' });
}

// Find all HTML files recursively
function getHtmlFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      // Don't recursively encrypt files inside potential node_modules
      if (item !== 'node_modules') {
        getHtmlFiles(fullPath, files);
      }
    } else if (item.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

const htmlFiles = getHtmlFiles(publicDir);
console.log(`Found ${htmlFiles.length} HTML files to encrypt.`);

let successCount = 0;
let failCount = 0;

for (const file of htmlFiles) {
  const relativePath = path.relative(publicDir, file);
  console.log(`Encrypting [${relativePath}]...`);
  
  const tempFile = file + '.tmp';
  try {
    // Run pagecrypt: npx pagecrypt <input> <output> <password>
    execSync(`npx pagecrypt "${file}" "${tempFile}" "${password}"`, { stdio: 'inherit' });
    
    // Check if output file was created and has size > 0
    if (fs.existsSync(tempFile) && fs.statSync(tempFile).size > 0) {
      fs.renameSync(tempFile, file);
      successCount++;
    } else {
      throw new Error('Generated file is empty or missing.');
    }
  } catch (err) {
    console.error(`Failed to encrypt ${relativePath}:`, err);
    if (fs.existsSync(tempFile)) {
      try { fs.unlinkSync(tempFile); } catch(e) {}
    }
    failCount++;
  }
}

console.log(`Encryption finished! Success: ${successCount}, Failed: ${failCount}`);
if (failCount > 0) {
  process.exit(1);
}
