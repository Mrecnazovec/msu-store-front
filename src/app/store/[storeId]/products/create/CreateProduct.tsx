'use client'

import { useGetCategories } from '@/hooks/queries/categories/useGetCategory'
import { ProductForm } from '../ProductForm'

export function CreateProduct() {
	const { categories } = useGetCategories()

	return <ProductForm categories={categories || []} />
}
