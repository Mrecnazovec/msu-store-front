import { Catalog } from '@/components/ui/catalog/Catalog'
import { categoryService } from '@/services/category.service'
import { productService } from '@/services/product.service'
import type { Metadata } from 'next'

export const revalidate = 60

export type paramsType = Promise<{ id: string }>

export async function generateStaticParams() {
	const categories = await categoryService.getAll()

	return categories.map((category) => ({
		params: { id: category.id.toString() },
	}))
}

async function getProducts(id: string) {
	const products = await productService.getByCategory(id)
	const category = await categoryService.getById(id)

	return { products, category }
}

export async function generateMetadata(params: { params: paramsType }): Promise<Metadata> {
	const { products, category } = await getProducts((await params.params).id)

	return {
		title: category.title,
		description: category.description,
		openGraph: {
			images:
				products.length > 0
					? [
							{
								url: products[0].colors[0].images[0].url,
								width: 1000,
								height: 1000,
								alt: category.title,
							},
					  ]
					: [],
		},
	}
}

export default async function CategoryPage(params: { params: paramsType }) {
	const { products, category } = await getProducts((await params.params).id)

	return (
		<div className='py-6'>
			<Catalog title={category.title} description={category.description} products={products} />
		</div>
	)
}
