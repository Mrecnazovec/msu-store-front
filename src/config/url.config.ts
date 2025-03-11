export const APP_URL = process.env.APP_URL as string

export const PUBLIC_URL = {
	root: (url = '') => `${url ? url : ''}`,

	home: () => PUBLIC_URL.root('/'),
	auth: () => PUBLIC_URL.root('/auth'),
	explorer: (query = '') => PUBLIC_URL.root(`/explorer${query}`),

	product: (id = '') => PUBLIC_URL.root(`/product/${id}`),
	category: (id = '') => PUBLIC_URL.root(`/category/${id}`),
	order: (id = '') => PUBLIC_URL.root(`/order/${id}`),
}

export const DASHBOARD_URL = {
	root: (url = '') => `/dashboard${url ? url : ''}`,

	home: () => DASHBOARD_URL.root('/'),
	favorites: () => DASHBOARD_URL.root('/favorites'),
}

export const STORE_URL = {
	root: (url = '') => `/store${url ? url : ''}`,

	home: (storeId = '') => STORE_URL.root(`/${storeId}`),

	products: (storeId = '') => STORE_URL.root(`/${storeId}/products`),
	productCreate: (storeId = '') => STORE_URL.root(`/${storeId}/products/create`),
	productEdit: (storeId = '', id = '') => STORE_URL.root(`/${storeId}/products/${id}`),

	categories: (storeId = '') => STORE_URL.root(`/${storeId}/categories`),
	categoryCreate: (storeId = '') => STORE_URL.root(`/${storeId}/categories/create`),
	categoryEdit: (storeId = '', id = '') => STORE_URL.root(`/${storeId}/categories/${id}`),

	discounts: (storeId = '') => STORE_URL.root(`/${storeId}/discounts`),
	discountCreate: (storeId = '') => STORE_URL.root(`/${storeId}/discounts/create`),
	discountEdit: (storeId = '', id = '') => STORE_URL.root(`/${storeId}/discounts/${id}`),

	users: (storeId = '') => STORE_URL.root(`/${storeId}/users`),
	userEdit: (storeId = '', id = '') => STORE_URL.root(`/${storeId}/users/${id}`),

	reviews: (storeId = '') => STORE_URL.root(`/${storeId}/reviews`),
	orders: (storeId = '') => STORE_URL.root(`/${storeId}/orders`),
	settings: (storeId = '') => STORE_URL.root(`/${storeId}/settings`),
}
