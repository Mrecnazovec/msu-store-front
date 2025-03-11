import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form-elements/Form'
import { Input } from '@/components/ui/form-elements/Input'
import { validEmail, validPhone, validTelegramUsername } from '@/shared/regex'
import { IAuthForm } from '@/shared/types/auth.interface'
import { UseFormReturn } from 'react-hook-form'

interface AuthFieldsProps {
	form: UseFormReturn<IAuthForm, any, undefined>
	isPending: boolean
	isReg?: boolean
}

export function AuthFields({ form, isPending, isReg = false }: AuthFieldsProps) {
	return (
		<>
			{isReg && (
				<FormField
					control={form.control}
					name='name'
					rules={{
						required: 'Имя обязательно',
					}}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder='Имя' disabled={isPending} {...field} value={field.value ?? ''} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}
			<FormField
				control={form.control}
				name='email'
				rules={{
					required: 'Почта обязательна',
					pattern: {
						value: validEmail,
						message: 'Введите корректную почту',
					},
				}}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input placeholder='example@example.com' type='email' disabled={isPending} {...field} value={field.value ?? ''} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name='password'
				rules={{
					required: 'Пароль обязателен',
					minLength: {
						value: 6,
						message: 'Минимум 6 символов',
					},
				}}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input placeholder='******' type='password' disabled={isPending} {...field} value={field.value ?? ''} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			{isReg && (
				<FormField
					control={form.control}
					name='phone'
					rules={{
						required: 'Номер телефона обязателен',
						pattern: {
							value: validPhone,
							message: 'Введите корректный номер телефона',
						},
					}}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder='+998' type='tel' disabled={isPending} {...field} value={field.value ?? ''} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}
						{isReg && (
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
								<Input placeholder='@Example' type='text' disabled={isPending} {...field} value={field.value ?? ''} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}
		</>
	)
}
