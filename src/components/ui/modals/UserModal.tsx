import { PropsWithChildren, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../Dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../form-elements/Form'
import { Button } from '../Button'
import { useUpdateUser } from '@/hooks/queries/users/useUpdateUser'
import { IUserInput } from '@/shared/types/user.interface'
import { Input } from '../form-elements/Input'
import { validTelegramUsername } from '@/shared/regex'
import { useProfile } from '@/hooks/useProfile'

export function UserModal({ children }: PropsWithChildren) {
	const [isOpen, setIsOpen] = useState(false)
	const { user, isLoading } = useProfile()

	const form = useForm<IUserInput>({
		mode: 'onChange',
		defaultValues: {
			name: user?.name || '',
			phone: user?.phone || '',
			social: user?.social || '',
		},
	})

	const { updateUser, isLoadingUpdate } = useUpdateUser()

	const onSubmit: SubmitHandler<IUserInput> = (data) => {
		updateUser(data)
		form.reset()
		setIsOpen(false)
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Редактирование профиля</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<FormField
							control={form.control}
							name='name'
							rules={{ required: 'Имя обязательно' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Имя</FormLabel>
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
									<FormLabel>Номер телефона</FormLabel>
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
									<FormLabel>Телеграм юзер</FormLabel>
									<FormControl>
										<Input placeholder='Телеграм юзер' type='text' disabled={isLoadingUpdate} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className='flex justify-end'>
							<Button disabled={isLoadingUpdate}>Обновить</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
