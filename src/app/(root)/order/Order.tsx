'use client'

import { useCart } from '@/hooks/useCart'
import styles from './Order.module.scss'
import { OrderItem } from './order-item/OrderItem'
import { Heading } from '@/components/ui/Heading'
import { useGeo } from '@/hooks/queries/geo/useGeo'
import { formatPrice } from '@/utils/string/format-price'
import { Loader } from '@/components/ui/Loader'
import { Button } from '@/components/ui/Button'
import { DiscountModal } from '@/components/ui/modals/DiscountModel'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useCreateOrder } from '@/hooks/queries/orders/useCreateOrder'
import { useActions } from '@/hooks/useActions'
import { useRouter } from 'next/navigation'
import { PUBLIC_URL } from '@/config/url.config'
import { useProfile } from '@/hooks/useProfile'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IUserInput } from '@/shared/types/user.interface'
import { useUpdateUser } from '@/hooks/queries/users/useUpdateUser'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form-elements/Form'
import { validTelegramUsername } from '@/shared/regex'
import { Input } from '@/components/ui/form-elements/Input'
import { discountService } from '@/services/discount.service'

export function Order() {
	const { items, total } = useCart()
	const { geo, isLoading } = useGeo()

	const { user } = useProfile()

	const [discount, setDiscount] = useState<{ value: number; name: string; id: string }>({ value: 0, name: '', id: '' })

	const { createOrder } = useCreateOrder()
	const { reset } = useActions()
	const router = useRouter()

	const form = useForm<IUserInput>({
		mode: 'onChange',
		defaultValues: {
			name: '',
			phone: '',
			social: '',
		},
	})

	useEffect(() => {
		if (user) {
			form.reset({
				name: user.name || '',
				phone: user.phone || '',
				social: user.social || '',
			})
		}
	}, [user, form.reset])

	const { updateUser, isLoadingUpdate } = useUpdateUser()
	const [isUserUpdated, setIsUserUpdated] = useState(false)

	const onSubmit: SubmitHandler<IUserInput> = async (data) => {
		try {
			const updatedDiscountArch = [...(user?.discountArch || []), discount.name]

			await updateUser({
				...data,
				discountArch: updatedDiscountArch,
			})

			setIsUserUpdated(true)
		} catch (error) {
			console.error('Ошибка при обновлении пользователя:', error)
		}
	}

	useEffect(() => {
		if (isUserUpdated && user) {
			const orderData = {
				currency: geo,
				discount: discount.value,
				items: items.map((item) => ({
					id: item.id,
					product: item.product,
					productId: item.product.id,
					quantity: item.quantity,
					size: item.product.size[item.currentSize],
					storeId: item.product.storeId,
					price: item.price.find((p) => p.currency === geo)?.price || 0,
					color: item.product.colors[item.currentColor].name,
				})),
				user,
			}

			if (discount.id) discountService.use(discount.id)
			createOrder(orderData)
			setIsUserUpdated(false)
			reset()
			router.push(PUBLIC_URL.home())
		}
	}, [isUserUpdated, user])

	return (
		<div className={styles.order}>
			<Heading title='Заказ' description='Оформление заказа' />
			<div className={styles.content}>
				<div className={styles.items}>
					{items.map((item) => (
						<OrderItem item={item} key={item.id} />
					))}
				</div>
				<div className={styles.right}>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
							<FormField
								control={form.control}
								name='name'
								rules={{ required: 'Имя обязательно' }}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input {...field} placeholder='Имя' disabled={isLoadingUpdate} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='phone'
								rules={{ required: 'Номер телефона' }}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input {...field} type='tel' placeholder='Номер телефона' disabled={isLoadingUpdate} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='social'
								rules={{
									pattern: {
										value: validTelegramUsername,
										message: 'Введите корректный юзер',
									},
								}}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input placeholder='Телеграм юзер @Example' type='text' disabled={isLoadingUpdate} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className={cn(styles.price_box, discount.value && 'text-green-500')}>
								{isLoading ? <Loader size='sm' /> : <>Цена: {formatPrice(total - (total * discount.value) / 100, geo)}</>}
							</div>

							<Button disabled={isLoading}>Оформить заказ</Button>
						</form>
						<DiscountModal setDiscount={setDiscount}>
							<Button type='button' variant='secondary'>
								Использовать промокод
							</Button>
						</DiscountModal>
					</Form>
				</div>
			</div>
		</div>
	)
}
