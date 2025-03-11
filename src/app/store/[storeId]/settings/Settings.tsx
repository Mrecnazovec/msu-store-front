'use client'

import { useDeleteStore } from '@/hooks/queries/stores/useDeleteStore'
import { useUpdateStore } from '@/hooks/queries/stores/useUpdateStore'
import { IStoreEdit } from '@/shared/types/store.interface'
import { SubmitHandler, useForm } from 'react-hook-form'

import styles from '../Store.module.scss'
import { Heading } from '@/components/ui/Heading'
import { ConfirmModule } from '@/components/ui/modals/ConfirmModule'
import { Button } from '@/components/ui/Button'
import { Trash } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form-elements/Form'
import { Input } from '@/components/ui/form-elements/Input'
import { Textarea } from '@/components/ui/Textarea'

export function Settings() {
	const { store, updateStore, isLoadingUpdate } = useUpdateStore()
	const { deleteStore, isLoadingDelete } = useDeleteStore()

	const form = useForm<IStoreEdit>({
		mode: 'onChange',
		values: {
			title: store?.title || '',
			description: store?.description || '',
		},
	})

	const onSubmit: SubmitHandler<IStoreEdit> = (data) => {
		updateStore(data)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Heading title='Настройки' description='Управление настройками коллекции' />
				<ConfirmModule handleClick={() => deleteStore()}>
					<Button size='icon' variant='default' disabled={isLoadingDelete}>
						<Trash className='size-4' />
					</Button>
				</ConfirmModule>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className={styles.fields}>
						<FormField
							control={form.control}
							name='title'
							rules={{
								required: 'Название обязательно',
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Название</FormLabel>
									<FormControl>
										<Input placeholder='Название коллекции' disabled={isLoadingUpdate} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Описание</FormLabel>
								<FormControl>
									<Textarea placeholder='Описание коллекции' disabled={isLoadingUpdate} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button disabled={isLoadingUpdate}>Сохранить</Button>
				</form>
			</Form>
		</div>
	)
}
