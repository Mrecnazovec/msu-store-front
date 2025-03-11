'use client'

import { useCreateDiscount } from '@/hooks/queries/discounts/useCreateDiscount'
import { useDeleteDiscount } from '@/hooks/queries/discounts/useDeleteDiscount'
import { useUpdateDiscount } from '@/hooks/queries/discounts/useUpdateDiscount'
import { IDiscount, IDiscountInput } from '@/shared/types/discount.interface'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from '../Store.module.scss'
import { Heading } from '@/components/ui/Heading'
import { ConfirmModule } from '@/components/ui/modals/ConfirmModule'
import { Button } from '@/components/ui/Button'
import { Trash, Plus } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form-elements/Form'
import { Input } from '@/components/ui/form-elements/Input'
import { useEffect } from 'react'

interface DiscountFormProps {
	discount?: IDiscount | null
}

export function DiscountForm({ discount }: DiscountFormProps) {
	const { createDiscount, isLoadingCreate } = useCreateDiscount()
	const { updateDiscount, isLoadingUpdate } = useUpdateDiscount()
	const { deleteDiscount, isLoadingDelete } = useDeleteDiscount()

	const title = discount ? 'Изменить данные' : 'Создать категорию'
	const description = discount ? ' Изменить данные о категории' : 'Добавить новую категорию в магазин'
	const action = discount ? 'Сохранить' : 'Создать'

	const form = useForm<IDiscountInput>({
		mode: 'onChange',
		defaultValues: {
			name: discount?.name || '',
			discount: discount?.discount || 0,
			quantity: discount?.quantity || 0,
		},
	})

	useEffect(() => {
		if (discount) {
			form.reset({
				name: discount?.name || '',
				discount: discount?.discount || 0,
				quantity: discount?.quantity || 0,
			})
		}
	}, [discount, form.reset])

	const { control, handleSubmit } = form

	const onSubmit: SubmitHandler<IDiscountInput> = (data) => {
		const formattedData = {
			name: data.name,
			discount: Number(data.discount),
			quantity: Number(data.quantity),
		}

		if (discount) updateDiscount(formattedData)
		else createDiscount(formattedData)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Heading title={title} description={description} />
				{discount && (
					<ConfirmModule handleClick={() => deleteDiscount()}>
						<Button size='icon' disabled={isLoadingDelete}>
							<Trash className='size-4' />
						</Button>
					</ConfirmModule>
				)}
			</div>

			<Form {...form}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.fields}>
						{/* Название категории */}
						<FormField
							control={control}
							name='name'
							rules={{ required: 'Название обязательно' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Название</FormLabel>
									<FormControl>
										<Input disabled={isLoadingCreate || isLoadingUpdate} placeholder='Название промокода' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name='discount'
							rules={{ required: 'Скидка обязательна' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Скидка %</FormLabel>
									<FormControl>
										<Input disabled={isLoadingCreate || isLoadingUpdate} placeholder='Скидка %' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name='quantity'
							rules={{ required: 'Количество обязательно' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Количество</FormLabel>
									<FormControl>
										<Input disabled={isLoadingCreate || isLoadingUpdate} placeholder='Количество' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button type='submit' disabled={isLoadingCreate || isLoadingUpdate}>
						{action}
					</Button>
				</form>
			</Form>
		</div>
	)
}
