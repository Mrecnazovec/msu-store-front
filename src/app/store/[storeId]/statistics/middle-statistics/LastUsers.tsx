import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ILastUsers } from '@/shared/types/statistics.interface'

import styles from './MiddleStatistics.module.scss'
import Image from 'next/image'
import { formatPrice } from '@/utils/string/format-price'

interface LastUsersProps {
	data: ILastUsers[]
	currency: string
}

export function LastUsers({ data, currency }: LastUsersProps) {
	return (
		<Card>
			<CardHeader className={styles.header}>
				<CardTitle>Последние покупатели</CardTitle>
			</CardHeader>
			<CardContent>
				{data.length ? (
					data.map((user) => (
						<div key={user.id} className={styles.user}>
							<Image src={user.picture} alt={user.name} width={40} height={40} />
							<div className={styles.info}>
								<p className={styles.name}>{user.name}</p>
								<p className='mb-1'>{user.email}</p>
							</div>
							<div className={styles.total}>+{formatPrice(user.total, currency)}</div>
						</div>
					))
				) : (
					<div>Нет последних покупателей</div>
				)}
			</CardContent>
		</Card>
	)
}
