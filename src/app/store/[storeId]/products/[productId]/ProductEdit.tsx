'use client'

import { useGetCategories } from '@/hooks/queries/categories/useGetCategory'
import { productService } from '@/services/product.service'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { ProductForm } from '../ProductForm'

export function ProductEdit() {
	const params = useParams<{ productId: string }>()

	const { data } = useQuery({
		queryKey: ['get product'],
		queryFn: () => productService.getById(params.productId),
	})

	const { categories } = useGetCategories()

	return <ProductForm product={data} categories={categories || []} />
}
