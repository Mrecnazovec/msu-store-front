import { axiosClassic } from '@/api/api.interceptors'
import { API_URL } from '@/config/api.config'
import { getCurrency, removeCurrencyFromStorage, saveCurrencyStorage } from './geo-save.service'
import { useIp } from '@/context/GeoContext'

class GeoService {
	async getGeo() {
		const currency = getCurrency()

		if (!currency) {
			// const { data } = await axiosClassic({
			// 	url: `${API_URL.geo()}`,
			// 	method: 'GET',
			// })

			// if (data) {
			// 	if (data.currency.code === 'UZS') {
			// 		saveCurrencyStorage(data.currency.code)
			// 		return data.currency.code
			// 	} else if (data.currency.code === 'RUB') {
			// 		saveCurrencyStorage(data.currency.code)
			// 		return data.currency.code
			// 	} else {
			// 		saveCurrencyStorage('USD')
			// 		return 'USD'
			// 	}
			// }
			const { currency } = useIp()
			return currency
		} else if (currency !== 'UZS' && currency !== 'RUB' && currency !== 'USD') {
			removeCurrencyFromStorage()
			this.getGeo()
		} else return currency
	}

	async switch(data: string) {
		saveCurrencyStorage(data)

		return data
	}
}

export const geoService = new GeoService()
