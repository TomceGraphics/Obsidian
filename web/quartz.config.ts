import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Knowledge Vaults",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "",
    ignorePatterns: ["private", ".obsidian", ".trash", ".git", ".smart-env"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Outfit",
        body: "Inter",
        code: "Fira Code",
      },
      colors: {
        lightMode: {
          light: "#fafafa",
          lightgray: "#e5e5e5",
          gray: "#737373",
          dark: "#171717",
          darkgray: "#404040",
          secondary: "#2563eb",
          tertiary: "#3b82f6",
          highlight: "rgba(59, 130, 246, 0.1)",
        },
        darkMode: {
          light: "#0b0f19",
          lightgray: "#1e293b",
          gray: "#94a3b8",
          dark: "#f8fafc",
          darkgray: "#cbd5e1",
          secondary: "#38bdf8",
          tertiary: "#0ea5e9",
          highlight: "rgba(56, 189, 248, 0.15)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: true }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
