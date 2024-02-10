interface SiteConfig {
	author: string
	title: string
	description: string
	lang: string
	ogLocale: string
	shareMessage: string
	paginationSize: number
}

export const siteConfig: SiteConfig = {
	author: 'TheCell', // Site author
	title: 'TheCells Blog', // Site title.
	description: 'This is where the fun happens', // Description to display in the meta tags
	lang: 'en-GB',
	ogLocale: 'en_GB',
	shareMessage: 'Take a look at this Post', // Message to share a post on social media
	paginationSize: 6 // Number of posts per page
}
