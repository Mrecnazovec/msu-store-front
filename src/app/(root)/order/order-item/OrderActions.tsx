import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { ICartItem } from '@/shared/types/cart.interface'

import { Button } from '@/components/ui/Button'
import { Minus, Plus } from 'lucide-react'
import styles from '../Order.module.scss'

interface ICartActions {
	item: ICartItem
}

export function OrderActions({ item }: ICartActions) {
	const { changeQuantity } = useActions()

	const { items } = useCart()

	const quantity = items.find((cardItem) => cardItem.id === item.id)?.quantity

	return (
		<div className={styles.actions}>
			<Button onClick={() => changeQuantity({ id: item.id, type: 'minus' })} variant='ghost' size='icon' disabled={quantity === 1}>
				<Minus />
			</Button>
			<input disabled readOnly value={quantity} />

			<Button onClick={() => changeQuantity({ id: item.id, type: 'plus' })} variant='ghost' size='icon'>
				<Plus />
			</Button>
		</div>
	)
}
