'use client'

import { useGetByNameDiscount } from '@/hooks/queries/discounts/useGetByNameDiscount'
import { useProfile } from '@/hooks/useProfile'
import { IDiscountInput } from '@/shared/types/discount.interface'
import { PropsWithChildren, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../Button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../Dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../form-elements/Form'
import { Input } from '../form-elements/Input'
import { Loader } from '../Loader'

interface DiscountModalProps {
	setDiscount: (discount: { value: number; name: string; id: string }) => void
}

export function DiscountModal({ children, setDiscount }: PropsWithChildren<DiscountModalProps>) {
	const [isOpen, setIsOpen] = useState(false)
	const { user } = useProfile()

	const form = useForm<IDiscountInput>({
		mode: 'onChange',
		defaultValues: { name: '' },
	})

	const { discount, getDiscountByName, isLoadingDiscount } = useGetByNameDiscount()

	const onSubmit: SubmitHandler<IDiscountInput> = ({ name }) => {
		if (user?.discountArch.includes(name)) {
			form.setError('name', { type: 'manual', message: 'Вы уже использовали этот промокод' })
			return
		}

		getDiscountByName(name, {
			onSuccess: (data) => {
				if (data.quantity === 0) {
					form.setError('name', { type: 'manual', message: 'Промокоды закончились' })
					return
				}
				setDiscount({ value: data?.discount || 0, name, id: data.id })
			},
			onError: () => {
				setDiscount({ value: 0, name: '', id: '' })
			},
		})
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Введите промокод</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<FormField
							control={form.control}
							name='name'
							rules={{ required: 'Введите промокод' }}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input {...field} placeholder='Промокод' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Отображение скидки */}
						<div className='flex items-center justify-center'>
							{isLoadingDiscount ? (
								<Loader size='sm' />
							) : (
								discount && discount.quantity !== 0 && <p className='text-green-500'>Скидка: {discount.discount}%</p>
							)}
						</div>

						<div className='flex justify-end'>
							<Button type='submit' disabled={isLoadingDiscount}>
								Использовать
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
