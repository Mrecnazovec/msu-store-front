import { useGeo } from './queries/geo/useGeo'
import { useTypedSelector } from './useTypedSelector'

export const useCart = () => {
	const items = useTypedSelector((state) => state.cart.items)
	const { geo } = useGeo()

	const total = items.reduce((acc, item) => acc + (item.price.find((price) => price.currency === geo)?.price || 0) * item.quantity, 0)

	return { items, total }
}
