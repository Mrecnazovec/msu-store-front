import { Catalog } from '@/components/ui/catalog/Catalog'
import { categoryService } from '@/services/category.service'
import { productService } from '@/services/product.service'
import type { Metadata } from 'next'
import { Product } from './Product'
import { notFound } from 'next/navigation'

export const revalidate = 60

export type paramsType = Promise<{ id: string }>

export async function generateStaticParams() {
	const products = await productService.getAll()

	const paths = products.map((product) => {
		return {
			params: { id: product.id },
		}
	})

	return paths
}

async function getProducts(id: string) {
	try {
		const product = await productService.getById(id)

		const similarProducts = await productService.getSimilar(id)

		return { product, similarProducts }
	} catch (error) {
		return notFound()
	}
}

export async function generateMetadata(params: { params: paramsType }): Promise<Metadata> {
	const { product } = await getProducts((await params.params).id)

	return {
		title: product.title,
		description: product.description,
		openGraph: {
			images: [
				{
					url: product.colors[0].images[0].url,
					width: 1000,
					height: 1000,
					alt: product.title,
				},
			],
		},
	}
}

export default async function ProductPage(params: { params: paramsType }) {
	const { product, similarProducts } = await getProducts((await params.params).id)

	return <Product initialProduct={product} similarProducts={similarProducts} id={(await params.params).id} />
}
