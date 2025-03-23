import { Button } from '@/components/ui/Button'
import { PUBLIC_URL } from '@/config/url.config'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { ArrowRight } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Страница не найдена',
	...NO_INDEX_PAGE,
}

export default function NotFound() {
	return (
		<div className='my-24 py-20 mx-auto text-center flex flex-col items-center max-w-4xl space-y-6'>
			<h1 className='text-4xl font-bold tracking-tighter md:text-5xl'>Ошибка 404! Страница не найдена</h1>
			<p className='text-lg text-muted-foreground'>Такой страницы не существует либо она была перенесена или удалена!</p>
			<Link href={PUBLIC_URL.home()}>
				<Button>
					На главную <ArrowRight className='size-4 ml-2 transition-all hover:ml-6' />
				</Button>
			</Link>
		</div>
	)
}
