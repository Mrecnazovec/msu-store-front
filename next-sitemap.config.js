module.exports = {
	siteUrl: 'https://msu-store.com',
	generateRobotsTxt: true,
	sitemapSize: 5000, // Лимит ссылок в одном файле карты сайта
	changefreq: 'daily',
	priority: 0.7,
	exclude: ['/store', '/dashboard', '/dashboard/favorites', '/store/discounts/create', '/store/discounts'],
	robotsTxtOptions: {
		policies: [
			{
				userAgent: '*',
				allow: '/',
				exclude: ['/store', '/dashboard', '/dashboard/favorites', '/store/discounts/create', '/store/discounts'],
			},
		],
	},
}
