export function formatPrice(price: number, currency: string) {
	return Math.floor(price).toLocaleString('ru-RU', {
		style: 'currency',
		currency: currency,
		minimumFractionDigits: 0,
	})
}