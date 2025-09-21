import type { Metadata } from 'next'
import { Home } from './Home'
import { productService } from '@/services/product.service'

export const metadata: Metadata = {
	title: 'Для людей Московского университета',
}

export const revalidate = 60

async function getProducts() {
	const data = (await productService.getMostPopular()).slice(0, 6)

	if (!data) return []

	return data
}

export default async function HomePage() {
	const data = await getProducts()

	return <Home products={data} />
}
