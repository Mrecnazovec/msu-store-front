'use client'

import { SearchInput } from '@/components/layouts/main-layout/header/search-input/SearchInput'
import { Catalog } from '@/components/ui/catalog/Catalog'
import { productService } from '@/services/product.service'
import { ICategory } from '@/shared/types/category.interface'
import { IProduct } from '@/shared/types/product.interface'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

interface ExplorerProps {
	products: IProduct[]
	categories: ICategory[]
}

export function Explorer({ products, categories }: ExplorerProps) {
	const searchParams = useSearchParams()
	const searchTerm = searchParams.get('searchTerm')

	const { data: searchTermData } = useQuery({
		queryKey: ['product explorer', searchTerm],
		queryFn: () => productService.getAll(searchTerm),
		initialData: products,
	})

	// Фильтруем категории и исключаем пустые
	const uniqueCategories = Array.from(new Map(categories.map((c) => [c.id, c])).values())

	const groupedProducts = uniqueCategories
		.map((category) => ({
			...category,
			products: searchTermData.filter((product) => product.category.id === category.id),
		}))
		.filter(({ products }) => products.length > 0) // Исключаем пустые категории

	return (
		<div className='space-y-6 mt-6'>
			{!searchTerm && <h2 className='text-2xl font-bold'>Каталог товаров</h2>}
			<div className='lg:hidden'>
				<SearchInput />
			</div>
			{searchTerm ? (
				<Catalog title={`Поиск по запросу "${searchTerm}"`} products={searchTermData} />
			) : (
				groupedProducts.map(({ id, title, products }) => <Catalog key={id} title={title} products={products} />)
			)}
		</div>
	)
}
