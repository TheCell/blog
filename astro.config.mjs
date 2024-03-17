import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { remarkReadingTime } from './src/utils/readTime.ts'
// import { transformerNotationHighlight, transformerNotationFocus, transformerNotationErrorLevel, transformerNotationDiff } from "@shikijs/transformers";
import { transformerNotationHighlight, transformerNotationFocus, transformerNotationErrorLevel, transformerNotationDiff } from "shikiji-transformers";

export default defineConfig({
	site: 'https://newblog.thecell.eu/',
	integrations: [
		mdx(),
		sitemap(),
		tailwind()
	],
	markdown: {
		remarkPlugins: [remarkReadingTime],
		drafts: true,
		syntaxHighlight: 'shiki',
		shikiConfig: {
			theme: 'github-dark-dimmed',
			wrap: true,	
			transformers: [transformerNotationHighlight(), transformerNotationFocus(), transformerNotationErrorLevel(), transformerNotationDiff()]
		}
	}
});
