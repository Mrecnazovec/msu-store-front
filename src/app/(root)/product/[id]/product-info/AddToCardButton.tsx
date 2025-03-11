import { Button } from '@/components/ui/Button'
import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { IProduct } from '@/shared/types/product.interface'

interface AddToCardButtonProps {
	product: IProduct
	currentSize: number
	currentColor: number
}

export function AddToCardButton({ product, currentSize, currentColor }: AddToCardButtonProps) {
	const { addToCard, removeFromCard } = useActions()

	const { items } = useCart()

	const currentElement = items.find(
		(cartItem) => cartItem.product.id === product.id && cartItem.currentColor === currentColor && cartItem.currentSize === currentSize
	)

	return (
		<Button
			size='icon'
			className='w-full'
			onClick={() =>
				currentElement
					? removeFromCard({ id: currentElement.id })
					: addToCard({ product, quantity: 1, price: product.prices, currentSize: currentSize, currentColor: currentColor })
			}
		>
			{currentElement ? 'Удалить из корзины' : 'Добавить в корзину'}
		</Button>
	)
}
