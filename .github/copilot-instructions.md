# Copilot Instructions for TheCell's Blog

## Project Overview
Astro-based personal blog with dual content sources: modern MDX posts (`blog/`) and WordPress exports (`wp_blog/`). Built with TypeScript, TailwindCSS, and uses Pagefind for search. Deployed to GitHub Pages via the `deploy` branch.

## Architecture & Key Patterns

### Content Collections
Two collections defined in [src/content/config.ts](src/content/config.ts):
- `blog`: Modern posts with strict schema (title max 80 chars, required image, category from enum)
- `wp_blog`: Legacy WordPress exports with relaxed schema (title max 100 chars, optional images)

Both use category enums from [src/data/categories.ts](src/data/categories.ts). Never hardcode category strings.

### Path Aliases (`@/`)
TypeScript paths configured in [tsconfig.json](tsconfig.json):
- `@/components/*` → components (Astro files)
- `@/layouts/*` → layouts
- `@/utils` → [src/utils/index.ts](src/utils/index.ts)
- `@/data/*` → data configs
- `@/site-config` → [src/data/site.config.ts](src/data/site.config.ts)

Always use these aliases for imports.

### Routing Pattern
- Modern posts: `/post/[slug]/` via [src/pages/post/[...slug].astro](src/pages/post/[...slug].astro)
- Archive posts: `/wp_blog/[slug]/` via [src/pages/wp_blog/[...slug].astro](src/pages/wp_blog/[...slug].astro)
- Check `isArchivalPost` prop in [PostCard.astro](src/components/PostCard.astro) to determine link format

### Reading Time Plugin
Custom remark plugin in [src/utils/readTime.ts](src/utils/readTime.ts) injects `minutesRead` into frontmatter. Access via:
```astro
const { remarkPluginFrontmatter } = await post.render();
const readTime = remarkPluginFrontmatter.minutesRead;
```

### Syntax Highlighting
Uses **shikiji-transformers** (legacy version), not the modern `@shikijs/transformers`. Config in [astro.config.mjs](astro.config.mjs) with theme `github-dark-dimmed` and transformers for highlights, focus, error levels, and diffs.

## Development Workflows

### Commands
```bash
npm start          # Dev server
npm run build      # Build site
npm run postbuild  # CRITICAL: Runs Pagefind search indexing after build
npm run format     # Prettier formatting
```

**Important**: The `postbuild` script is auto-run in CI but manual when building locally.

### Deployment
Triggered on push to `deploy` branch (not `main`). Workflow: [.github/workflows/build-and-deploy.yml](.github/workflows/build-and-deploy.yml)
1. Builds Astro site with `--site https://newblog.thecell.eu/`
2. Runs Pagefind indexing
3. Deploys to GitHub Pages

## Styling Conventions

### TailwindCSS
- Dark mode via `class` strategy (not media query)
- Custom dark background: `dark:bg-[#0a0910]`
- Custom white: `#f8f9fa`
- Body font: Manrope (loaded via astro-font)
- Typography plugin for prose content

### Grid Layouts
[ListPosts.astro](src/components/ListPosts.astro) uses conditional grid with `FirstBig` prop:
```astro
FirstBig && `md:[&>*:first-child]:col-span-2`
```
First post spans 2 columns on desktop when enabled.

## Special Features

### Hologram Images
Posts can have optional `hologram` frontmatter field for special shader effects (see [BlogPost.astro](src/layouts/BlogPost.astro) lines 60-80). Implementation uses custom CSS in global styles.

### Dual Collection Support
When adding features, account for both collections:
- Use `getPosts()` and `getWPPosts()` from [src/utils/post.ts](src/utils/post.ts)
- Tag filtering: `getPostByTag()` vs `getWPPostByTag()`
- Never merge collections in queries; maintain separation

### MDX Components
Custom MDX components in [src/components/mdx/](src/components/mdx/):
- `Code.astro`: Custom code block wrapper
- `SButton.astro`: Styled buttons in content
- `Blockquote.astro`: Custom blockquote styling

Register these in post pages' `components` prop when rendering.

## Common Tasks

### Adding a New Post
1. Create `.mdx` in `src/content/blog/`
2. Frontmatter must include: `title`, `description`, `pubDate`, `image`, `category` (from enum), `tags`
3. Optional: `draft: true` to hide, `hologram` for special effects
4. Image imports use `astro:assets` - import images at top of MDX

### Adding a Category
1. Add to `CATEGORIES` array in [src/data/categories.ts](src/data/categories.ts)
2. Update schema will auto-validate via Zod enum

### Modifying Layouts
- [BaseLayout.astro](src/layouts/BaseLayout.astro): Site-wide shell with header/footer
- [BlogPost.astro](src/layouts/BlogPost.astro): Modern post layout with TOC support
- [WPBlogPost.astro](src/layouts/WPBlogPost.astro): WordPress export layout

Both post layouts expect `headings` prop for table of contents generation.

## Gotchas
- Category strings must match `CATEGORIES` enum exactly (case-sensitive)
- `@/` paths won't work in non-TypeScript contexts (CSS, config files)
- Pagefind indexing happens post-build; missing it breaks search
- `shikiji-transformers` is deprecated but required - don't upgrade to `@shikijs/transformers` without testing
- WordPress posts use `date` field; modern posts use `pubDate`
