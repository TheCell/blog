import { getCollection } from 'astro:content'

export type Archive = {
    slug: string;
    title: string;
    description: string;
    date: Date;
    isWPExport: boolean;
}

export const getArchive = async () => {
    const wpEntries = (await getCollection('wp_blog'))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map((blog) => {
        const archive: Archive = {
            slug: blog.slug,
            title: blog.data.title,
            description: blog.data.description,
            date: blog.data.date,
            isWPExport: true
        }
        
        return archive;
    });
	return (await getCollection('blog'))
		.filter((post) => !post.data.draft)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
        .map((blog) => {
            const archive: Archive = {
                slug: blog.slug,
                title: blog.data.title,
                description: blog.data.description,
                date: blog.data.pubDate,
                isWPExport: false
            }
        
            return archive;
        })
        .concat(wpEntries);
}