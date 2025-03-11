'use client'

import { useGetProducts } from '@/hooks/queries/products/useGetProducts'
import { useParams } from 'next/navigation'
import { IProductColumn, productColumns } from './ProductColumns'
import { useGeo } from '@/hooks/queries/geo/useGeo'

import styles from '../Store.module.scss'
import DataTableLoading from '@/components/ui/data-table/DataTableLoading'
import { Heading } from '@/components/ui/Heading'
import Link from 'next/link'
import { STORE_URL } from '@/config/url.config'
import { Button } from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table/DataTable'
import { formatPrice } from '@/utils/string/format-price'

export function Products() {
	const params = useParams<{ storeId: string }>()
	const { geo } = useGeo()

	const { products, isLoading } = useGetProducts()

	const formattedProducts: IProductColumn[] = products
		? products.map((product) => ({
				id: product.id,
				title: product.title,
				price: formatPrice(Number(product.prices.find((currency) => currency.currency === geo)?.price) || 0, geo),
				category: product.category.title,
				storeId: product.storeId,
		  }))
		: []

	return (
		<div className={styles.wrapper}>
			{isLoading ? (
				<DataTableLoading />
			) : (
				<>
					<div className={styles.header}>
						<Heading title={`Товары ${products?.length}`} description='Все товары вашей коллекции' />
						<div className={styles.buttons}>
							<Link href={STORE_URL.productCreate(params.storeId)}>
								<Button>
									<Plus />
									<p className='mt-0.5'>Создать</p>
								</Button>
							</Link>
						</div>
					</div>
					<div className={styles.table}>
						<DataTable columns={productColumns} data={formattedProducts} filterKey='title' />
					</div>
				</>
			)}
		</div>
	)
}
