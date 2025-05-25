import { ICartItem, ICartItemColumn } from '@/shared/types/cart.interface'
import { Button } from '../Button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../Dialog'
import Link from 'next/link'
import { PUBLIC_URL } from '@/config/url.config'

interface OrderDetailProps {
	data: ICartItemColumn[]
}

export function OrderDetail({ data }: OrderDetailProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline' size='sm' role='combobox' aria-label='Оплата' className='w-32'>
					<p className='mt-1'>Подробнее</p>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='mb-2 text-2xl'>Подробности заказа</DialogTitle>
					<DialogDescription className='text-xl'>Товары:</DialogDescription>
					{data?.map((item, index) => (
						<div key={item.id ? item.id : index}>
							<DialogDescription className='text-lg'>
								{index + 1}){' '}
								<Link className='text-primary hover:opacity-75 transition-all' href={PUBLIC_URL.product(item.product ? item.product.id : '')}>
									{item.product ? item.product.title : 'Удалённый продукт'}
								</Link>{' '}
								x {item.quantity} шт. Размер: {item.size} Цвет: {item.color} по {item.price}{' '}
							</DialogDescription>
						</div>
					))}
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
