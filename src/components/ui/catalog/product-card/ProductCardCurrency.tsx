'use client'

import { useGeo } from '@/hooks/queries/geo/useGeo'
import { IPriceInput } from '@/shared/types/price.interface'
import { formatPrice } from '@/utils/string/format-price'
import { Loader } from '../../Loader'

interface ProductCardCurrencyProps {
	price: IPriceInput[]
}

export function ProductCardCurrency({ price }: ProductCardCurrencyProps) {
	const { geo, isLoading } = useGeo()

	const selectedPrice = price.find((p) => p.currency === geo)?.price

	const formattedPrice = selectedPrice ? formatPrice(Number(selectedPrice), geo) : 'Цена не указана'

	return <p>{isLoading ? <Loader size='sm' /> : formattedPrice}</p>
}
