'use client'

import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { getCurrency, removeCurrencyFromStorage, saveCurrencyStorage } from '@/services/geo/geo-save.service'

interface GeoContextType {
	currency: string
	isLoading: boolean
	switchCurrency: (newCurrency: string) => void
}

const GeoContext = createContext<GeoContextType | undefined>(undefined)

export const GeoProvider = ({ children }: PropsWithChildren) => {
	const [currency, setCurrency] = useState(getCurrency() || 'USD')
	const [isLoading, setIsLoading] = useState(true) // Добавили состояние загрузки

	useEffect(() => {
		const fetchGeo = async () => {
			setIsLoading(true) // Перед началом запроса включаем загрузку
			if (!getCurrency()) {
				try {
					const IP_REGISTRY_SECRET = process.env.NEXT_PUBLIC_IP_REGISTRY_SECRET
					const { data } = await axios.get(`https://api.ipregistry.co/?key=${IP_REGISTRY_SECRET}`)
					if (data) {
						let newCurrency = 'USD'
						if (data.currency.code === 'UZS' || data.currency.code === 'RUB') {
							newCurrency = data.currency.code
						}
						saveCurrencyStorage(newCurrency)
						setCurrency(newCurrency)
					}
				} catch (error) {
					console.error('Error fetching geo data:', error)
				}
			} else if (!['UZS', 'RUB', 'USD'].includes(currency)) {
				removeCurrencyFromStorage()
				fetchGeo()
			}
			setIsLoading(false) // Завершаем загрузку
		}

		fetchGeo()
	}, [currency])

	const switchCurrency = (newCurrency: string) => {
		saveCurrencyStorage(newCurrency)
		setCurrency(newCurrency)
	}

	return <GeoContext.Provider value={{ currency, isLoading, switchCurrency }}>{children}</GeoContext.Provider>
}

// Хук для использования контекста
export const useIp = () => {
	const context = useContext(GeoContext)
	if (!context) {
		throw new Error('useIp must be used within a GeoProvider')
	}
	return context
}
