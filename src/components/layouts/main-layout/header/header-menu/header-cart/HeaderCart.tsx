import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/Sheet'
import styles from './HeaderCart.module.scss'
import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import { ShoppingCartIcon } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { CartItem } from './cart-item/CartItem'
import { useGeo } from '@/hooks/queries/geo/useGeo'
import { formatPrice } from '@/utils/string/format-price'
import { Loader } from '@/components/ui/Loader'
import Link from 'next/link'
import { PUBLIC_URL } from '@/config/url.config'
import { useProfile } from '@/hooks/useProfile'
import { useState } from 'react'

export function HeaderCart() {
	const { items, total } = useCart()
	const { geo, isLoading } = useGeo()
	const { user, isLoading: isLoadingUser } = useProfile()
	const [open, setOpen] = useState(false)

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button size='icon' variant='ghost'>
					<ShoppingCartIcon />
				</Button>
			</SheetTrigger>
			<SheetContent className={styles.cart}>
				<SheetTitle>
					<Heading title='Корзина товаров' className='text-xl' />
				</SheetTitle>

				<div className={styles.items}>
					{items.length ? items.map((item) => <CartItem item={item} key={item.id} />) : <div className={styles.not_found}>Корзина пуста</div>}
				</div>

				{items.length ? (
					<>
						<div className={styles.total}>Итого к оплате: {isLoading ? <Loader size='sm' /> : formatPrice(total, geo)}</div>
						{isLoadingUser ? (
							<Loader size='sm' />
						) : user ? (
							<Link href={PUBLIC_URL.order()}>
								<Button onClick={() => setOpen(false)} className='w-full'>
									Перейти к заказу
								</Button>
							</Link>
						) : (
							<Link href={PUBLIC_URL.auth()}>
								<Button onClick={() => setOpen(false)} className='w-full'>
									Авторизоваться
								</Button>
							</Link>
						)}
					</>
				) : null}
			</SheetContent>
		</Sheet>
	)
}
