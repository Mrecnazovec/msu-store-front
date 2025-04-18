import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { ICartItem } from '@/shared/types/cart.interface'

import styles from '../HeaderCart.module.scss'
import { Button } from '@/components/ui/Button'
import { Minus, Plus, Trash } from 'lucide-react'

interface ICartActions {
	item: ICartItem
}

export function CartActions({ item }: ICartActions) {
	const { changeQuantity, removeFromCard } = useActions()

	const { items } = useCart()

	const quantity = items.find((cardItem) => cardItem.id === item.id)?.quantity

	return (
		<div className={styles.actions}>
			<Button onClick={() => changeQuantity({ id: item.id, type: 'minus' })} variant='ghost' size='icon' disabled={quantity === 1}>
				<Minus />
			</Button>
			<input disabled readOnly value={quantity} />

			<Button className='mr-3' onClick={() => changeQuantity({ id: item.id, type: 'plus' })} variant='ghost' size='icon'>
				<Plus />
			</Button>

			<Button size='icon' onClick={() => removeFromCard({ id: item.id })}>
				<Trash />
			</Button>
		</div>
	)
}
