'use client'

import { useRouter } from 'next/navigation'
import styles from './Auth.module.scss'
import { Button } from '@/components/ui/Button'
import { SERVER_URL } from '@/config/api.config'
import {FcGoogle} from 'react-icons/fc'

export function Social() {
	const router = useRouter()

	return (
		<div className={styles.social}>
			<Button variant={'outline'} onClick={() => router.push(`${SERVER_URL}/auth/google`)}>
				<FcGoogle /> Продолжить через Google
			</Button>
		</div>
	)
}
