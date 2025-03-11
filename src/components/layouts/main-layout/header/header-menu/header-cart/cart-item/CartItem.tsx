import { ICartItem } from '@/shared/types/cart.interface'
import styles from '../HeaderCart.module.scss'
import Link from 'next/link'
import { PUBLIC_URL } from '@/config/url.config'
import Image from 'next/image'
import { useGeo } from '@/hooks/queries/geo/useGeo'
import { formatPrice } from '@/utils/string/format-price'
import { Loader } from '@/components/ui/Loader'
import { CartActions } from './CartActions'

interface CartItemProps {
	item: ICartItem
}

export function CartItem({ item }: CartItemProps) {
	const { geo, isLoading } = useGeo()

	return (
		<div className={styles.item}>
			<Link href={PUBLIC_URL.product(`${item.product.id}?color=${item.currentColor}&size=${item.currentSize}`)} className={styles.image}>
				<Image src={item.product.colors[item.currentColor].images[0].url} alt={item.product.title} fill />
			</Link>
			<div className={styles.right}>
				<h2>{item.product.title}</h2>
				<p>{item.product.size[item.currentSize]}</p>
				<p>{item.product.colors[item.currentColor].name}</p>
				<p>{isLoading ? <Loader size='sm' /> : formatPrice(item.price.find((price) => price.currency === geo)?.price || 0, geo)}</p>
				<CartActions item={item} />
			</div>
		</div>
	)
}
