import { getCollection } from 'astro:content'

export type Archive = {
    slug: string;
    title: string;
    description: string;
    date: Date;
}

export const getArchive = async () => {
	return (await getCollection('blog'))
		.filter((post) => !post.data.draft)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
        .map((blog) => {
            return {
                slug: blog.slug,
                title: blog.data.title,
                description: blog.data.description,
                date: blog.data.pubDate
            } as Archive
        });
}