import Cookies from 'js-cookie'

export enum EnumTokens {
	'CURRENCY' = 'currency',
}

export const getCurrency = () => {
	const currency = Cookies.get(EnumTokens.CURRENCY)
	return currency || null
}

export const saveCurrencyStorage = (currency: string) => {
	Cookies.set(EnumTokens.CURRENCY, currency, {
		domain: process.env.APP_DOMAIN,
		sameSite: 'strict',
		expires: 1,
	})
}

export const removeCurrencyFromStorage = () => {
	Cookies.remove(EnumTokens.CURRENCY)
}
