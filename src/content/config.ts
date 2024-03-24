import { defineCollection, z } from 'astro:content'
import { CATEGORIES } from '@/data/categories'

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string().max(80),
			description: z.string(),
			// Transform string to Date object
			pubDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			image: image(),
			category: z.enum(CATEGORIES),
			tags: z.array(z.string()),
			draft: z.boolean().default(false)
		})
});

const wp_blog = defineCollection({
	schema: ({ image }) =>
		z.object({
			title: z.string().max(100),
			description: z.string().default('This was exported from WordPress'),
			category: z.enum(CATEGORIES).default(CATEGORIES[11]),
			date: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			coverImage: image().optional(),
			tags: z.array(z.string()).default([]),
			draft: z.boolean().default(false)
		})
});

export const collections = {
	blog,
	wp_blog
}
