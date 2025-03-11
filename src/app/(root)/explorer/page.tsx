import { Catalog } from '@/components/ui/catalog/Catalog'
import { categoryService } from '@/services/category.service'
import { productService } from '@/services/product.service'
import type { Metadata } from 'next'
import { Explorer } from './Explorer'

export const metadata: Metadata = {
	title: 'Каталог',
}

export const revalidate = 60

async function getProducts() {
	const products = await productService.getAll()

	return { products }
}

async function getCategories() {
	const categories = await categoryService.getAll()

	return { categories }
}

export default async function ExplorerPage() {
	const { products } = await getProducts()
	const { categories } = await getCategories()

	return <Explorer products={products} categories={categories} />
}
