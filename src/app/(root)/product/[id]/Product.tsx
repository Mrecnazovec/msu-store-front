'use client'

import { productService } from '@/services/product.service'
import { IProduct } from '@/shared/types/product.interface'
import { useQuery } from '@tanstack/react-query'
import styles from './Product.module.scss'
import { Catalog } from '@/components/ui/catalog/Catalog'
import { ProductGallery } from './product-gallery/ProductGallery'
import { ProductInfo } from './product-info/ProductInfo'
import { ProductReviews } from './product-reviews/ProductReviews'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

interface ProductProps {
	initialProduct: IProduct
	similarProducts: IProduct[]
	id?: string
}

export function Product({ initialProduct, similarProducts, id = '' }: ProductProps) {
	const searchParams = useSearchParams()
	const color = Number(searchParams.get('color')) || null

	const { data: product } = useQuery({
		queryKey: ['product', initialProduct.id],
		queryFn: () => productService.getById(id),
		initialData: initialProduct,
		enabled: !!id,
	})
	const [currentColor, setCurrentColor] = useState(color || 0)


	return (
		<div className={styles.product_page}>
			<div className={styles.content}>
				<div className={styles.blocks}>
					<ProductGallery product={product} currentColor={currentColor} />
					<ProductInfo product={product} currentColor={currentColor} setCurrentColor={setCurrentColor} />
				</div>
			</div>
			<Catalog title='Похожие товары' products={similarProducts} />
			<ProductReviews product={product} />
		</div>
	)
}
