'use client'

import { useCreateProduct } from '@/hooks/queries/products/useCreateProduct'
import { useDeleteProduct } from '@/hooks/queries/products/useDeleteProduct'
import { useUpdateProduct } from '@/hooks/queries/products/useUpdateProduct'
import { ICategory } from '@/shared/types/category.interface'
import { IProduct, IProductInput } from '@/shared/types/product.interface'
import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form'

import styles from '../Store.module.scss'
import { Heading } from '@/components/ui/Heading'
import { ConfirmModule } from '@/components/ui/modals/ConfirmModule'
import { Button } from '@/components/ui/Button'
import { Trash, Plus } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form-elements/Form'
import { Input } from '@/components/ui/form-elements/Input'
import { useEffect } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { ImageUpload } from '@/components/ui/form-elements/image-upload/ImageUpload'

interface ProductFormProps {
	product?: IProduct | null
	categories: ICategory[]
}

export function ProductForm({ product, categories }: ProductFormProps) {
	const { createProduct, isLoadingCreate } = useCreateProduct()
	const { updateProduct, isLoadingUpdate } = useUpdateProduct()
	const { deleteProduct, isLoadingDelete } = useDeleteProduct()

	const title = product ? 'Изменить данные' : 'Создать товар'
	const description = product ? ' Изменить данные о товаре' : 'Добавить новый товар в магазин'
	const action = product ? 'Сохранить' : 'Создать'

	const form = useForm<IProductInput>({
		mode: 'onChange',
		defaultValues: {
			title: product?.title || '',
			description: product?.description || '',
			categoryId: product?.category?.id || '',
			prices: product?.prices || [],
			size: product?.size || [],
			colors: product?.colors || [],
		},
	})

	useEffect(() => {
		if (product) {
			form.reset({
				title: product.title || '',
				description: product.description || '',
				categoryId: product.category?.id || '',
				prices: product.prices || [],
				size: product.size || [],
				colors: product.colors || [],
			});
		}
	}, [product, form.reset]);

	const { control, handleSubmit } = form

	// Поля для работы с ценами
	const { fields: priceFields } = useFieldArray({
		control,
		name: 'prices',
	})

	// Поля для работы с цветами
	const {
		fields: colorFields,
		append: addColor,
		remove: removeColor,
	} = useFieldArray({
		control,
		name: 'colors',
	})

	const onSubmit: SubmitHandler<IProductInput> = (data) => {
		const formattedData = {
			...data,
			colors: data.colors.map((color) => ({
				...color,
				images: color.images.map((image) => ({ url: typeof image === 'string' ? image : image.url })), // ✅ Исправленный вариант
			})),
		}
		if (product) updateProduct(formattedData)
		else createProduct(formattedData)
	}

	// Убедимся, что при рендере всегда есть 3 поля для цен
	useEffect(() => {
		form.setValue('prices', [
			{ currency: 'UZS', price: product?.prices.find((p) => p.currency === 'UZS')?.price || 0 },
			{ currency: 'RUB', price: product?.prices.find((p) => p.currency === 'RUB')?.price || 0 },
			{ currency: 'USD', price: product?.prices.find((p) => p.currency === 'USD')?.price || 0 },
		])
	}, [product, form.setValue])

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Heading title={title} description={description} />
				{product && (
					<ConfirmModule handleClick={() => deleteProduct()}>
						<Button size='icon' disabled={isLoadingDelete}>
							<Trash className='size-4' />
						</Button>
					</ConfirmModule>
				)}
			</div>

			<Form {...form}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.fields}>
						{/* Название товара */}
						<FormField
							control={control}
							name='title'
							rules={{ required: 'Название обязательно' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Название</FormLabel>
									<FormControl>
										<Input disabled={isLoadingCreate || isLoadingUpdate} placeholder='Название товара' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Категория товара */}
						<FormField
							control={control}
							name='categoryId'
							rules={{ required: 'Категория обязательна' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Категория</FormLabel>
									<Select disabled={isLoadingCreate || isLoadingUpdate} onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Категория товара' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												{categories.map((category) => (
													<SelectItem value={category.id} key={category.id}>
														{category.title}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className={styles.fields}>
						<div className='space-y-4'>
							{priceFields.map((item, index) => (
								<div key={item.id}>
									<FormField control={control} name={`prices.${index}.currency`} render={({ field }) => <FormLabel>{field.value}</FormLabel>} />
									<FormField
										control={control}
										name={`prices.${index}.price`}
										render={({ field }) => <Input placeholder='Цена' {...field} disabled={isLoadingCreate || isLoadingUpdate} />}
									/>
								</div>
							))}
						</div>
					</div>
					{/* Описание товара */}
					<FormField
						control={form.control}
						name='description'
						rules={{ required: 'Описание обязательно' }}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Описание</FormLabel>
								<FormControl>
									<Textarea disabled={isLoadingCreate || isLoadingUpdate} placeholder='Описание товара' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Цены */}

					<div className={styles.fields}>
						{/* Размеры */}
						<div>
							<FormField
								control={control}
								name='size'
								rules={{ required: 'Размер обязателен' }}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Размеры</FormLabel>
										<div className='space-y-2'>
											{field.value?.map((size, index) => (
												<div key={index} className='flex items-center space-x-2'>
													<FormControl>
														<Input
															value={size}
															onChange={(e) => {
																const newSize = [...field.value]
																newSize[index] = e.target.value
																field.onChange(newSize)
															}}
															placeholder='Введите размер'
															disabled={isLoadingCreate || isLoadingUpdate}
														/>
													</FormControl>
													<Button
														disabled={isLoadingCreate || isLoadingUpdate}
														type='button'
														onClick={() => field.onChange(field.value.filter((_, i) => i !== index))}
													>
														Удалить
													</Button>
												</div>
											))}
											<Button
												type='button'
												onClick={() => field.onChange([...(field.value || []), ''])}
												disabled={isLoadingCreate || isLoadingUpdate}
											>
												<Plus /> Добавить размер
											</Button>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					<FormField
						control={control}
						name='colors'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Цвета</FormLabel>
								<div className='space-y-2'>
									{colorFields.map((item, index) => (
										<div key={item.id}>
											<FormField
												control={control}
												name={`colors.${index}.images`}
												rules={{ required: 'Загрузите хотя бы одну картинку' }}
												render={({ field }) => (
													<FormItem className='mb-4'>
														<FormLabel>Картинки</FormLabel>
														<FormControl>
															<ImageUpload
																isDisabled={isLoadingCreate || isLoadingUpdate}
																onChange={(urls) => field.onChange(urls.map((url) => ({ url })))}
																value={field.value.map((image) => image.url)}
															/>
														</FormControl>
													</FormItem>
												)}
											/>
											<FormField
												control={control}
												name={`colors.${index}.name`}
												render={({ field }) => (
													<FormControl>
														<Input placeholder='Название цвета' {...field} />
													</FormControl>
												)}
											/>
											<FormField
												control={control}
												name={`colors.${index}.value`}
												render={({ field }) => (
													<FormItem className='mt-4'>
														<FormControl>
															<Input placeholder='Значение цвета' {...field} />
														</FormControl>
													</FormItem>
												)}
											/>
											<Button className='mt-2' type='button' onClick={() => removeColor(index)}>
												Удалить цвет
											</Button>
										</div>
									))}
									<Button type='button' onClick={() => addColor({ name: '', value: '', images: [] })}>
										<Plus /> Добавить цвет
									</Button>
								</div>
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
