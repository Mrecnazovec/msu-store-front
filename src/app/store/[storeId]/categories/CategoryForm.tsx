'use client'

import { useCreateCategory } from '@/hooks/queries/categories/useCreateCategory'
import { useDeleteCategory } from '@/hooks/queries/categories/useDeleteCategory'
import { useUpdateCategory } from '@/hooks/queries/categories/useUpdateCategory'
import { ICategory, ICategoryInput } from '@/shared/types/category.interface'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from '../Store.module.scss'
import { Heading } from '@/components/ui/Heading'
import { ConfirmModule } from '@/components/ui/modals/ConfirmModule'
import { Button } from '@/components/ui/Button'
import { Trash, Plus } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form-elements/Form'
import { Input } from '@/components/ui/form-elements/Input'
import { useEffect } from 'react'
import { Textarea } from '@/components/ui/Textarea'

interface CategoryFormProps {
	category?: ICategory | null
}

export function CategoryForm({ category }: CategoryFormProps) {
	const { createCategory, isLoadingCreate } = useCreateCategory()
	const { updateCategory, isLoadingUpdate } = useUpdateCategory()
	const { deleteCategory, isLoadingDelete } = useDeleteCategory()

	const title = category ? 'Изменить данные' : 'Создать категорию'
	const description = category ? ' Изменить данные о категории' : 'Добавить новую категорию в магазин'
	const action = category ? 'Сохранить' : 'Создать'

	const form = useForm<ICategoryInput>({
		mode: 'onChange',
		defaultValues: {
			title: category?.title || '',
			description: category?.description || '',
		},
	})

	useEffect(() => {
		if (category) {
			form.reset({
				title: category?.title || '',
				description: category?.description || '',
			})
		}
	}, [category, form.reset])

	const { control, handleSubmit } = form

	const onSubmit: SubmitHandler<ICategoryInput> = (data) => {
		if (category) updateCategory(data)
		else createCategory(data)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Heading title={title} description={description} />
				{category && (
					<ConfirmModule handleClick={() => deleteCategory()}>
						<Button size='icon' disabled={isLoadingDelete}>
							<Trash className='size-4' />
						</Button>
					</ConfirmModule>
				)}
			</div>

			<Form {...form}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.fields}>
						<FormField
							control={control}
							name='title'
							rules={{ required: 'Название обязательно' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Название</FormLabel>
									<FormControl>
										<Input disabled={isLoadingCreate || isLoadingUpdate} placeholder='Название категории' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name='description'
						rules={{ required: 'Описание обязательно' }}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Описание</FormLabel>
								<FormControl>
									<Textarea disabled={isLoadingCreate || isLoadingUpdate} placeholder='Описание категории' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type='submit' disabled={isLoadingCreate || isLoadingUpdate}>
						{action}
					</Button>
				</form>
			</Form>
		</div>
	)
}
