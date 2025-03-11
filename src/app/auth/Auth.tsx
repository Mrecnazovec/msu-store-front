'use client'

import { Button } from '@/components/ui/Button'
import { useState } from 'react'
import { useAuthForm } from './useAuthForm'
import styles from './Auth.module.scss'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { Form } from '@/components/ui/form-elements/Form'
import { AuthFields } from './AuthFields'
import { Social } from './Social'
import Link from 'next/link'
import { PUBLIC_URL } from '@/config/url.config'

export function Auth() {
	const [isReg, setIsReg] = useState(false)

	const { onSubmit, form, isPending } = useAuthForm(isReg)

	return (
		<div className={styles.wrapper}>
			<Link href={PUBLIC_URL.home()} className={styles.left}>
				<Image src='/images/logo.svg' alt='msu-store auth' width={100} height={100} />
				<h1>MSU STORE</h1>
			</Link>
			<div className={styles.right}>
				<Card className={styles.card}>
					<CardHeader className={styles.header}>
						<CardTitle>{isReg ? 'Создать аккаунт' : 'Войти в аккаунт'}</CardTitle>
						<CardDescription>Войдите или создайте учётную запись, чтобы оформлять покупки!</CardDescription>
					</CardHeader>
					<CardContent className={styles.content}>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<AuthFields form={form} isPending={isPending} isReg={isReg} />

								<Button variant={'secondary'} disabled={isPending}>
									{isReg ? 'Создать' : 'Войти'}
								</Button>
							</form>
						</Form>
						<Social />
					</CardContent>
					<CardFooter className={styles.footer}>
						{isReg ? 'Уже есть аккаунт? ' : 'Ещё нет аккаунта? '}
						<button onClick={() => setIsReg(!isReg)}>{isReg ? ' Войти' : ' Создать'}</button>
					</CardFooter>
				</Card>
			</div>
		</div>
	)
}
