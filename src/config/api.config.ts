export const SERVER_URL = process.env.SERVER_URL as string

export const API_URL = {
	root: (url = '') => `${url ? url : ''}`,

	auth: (url = '') => API_URL.root(`/auth${url}`),
	users: (url = '') => API_URL.root(`/users${url}`),
	categories: (url = '') => API_URL.root(`/categories${url}`),
	files: (url = '') => API_URL.root(`/files${url}`),
	stores: (url = '') => API_URL.root(`/stores${url}`),
	orders: (url = '') => API_URL.root(`/orders${url}`),
	statistics: (url = '') => API_URL.root(`/statistics${url}`),
	products: (url = '') => API_URL.root(`/products${url}`),
	reviews: (url = '') => API_URL.root(`/reviews${url}`),
	discounts: (url = '') => API_URL.root(`/discounts${url}`),
	geo: (url = '') => API_URL.root(`/geo${url}`),

}
