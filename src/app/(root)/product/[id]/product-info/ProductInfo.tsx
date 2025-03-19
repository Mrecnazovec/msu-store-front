import { IProduct } from '@/shared/types/product.interface'
import styles from './ProductInfo.module.scss'
import { ProductCardCurrency } from '@/components/ui/catalog/product-card/ProductCardCurrency'
import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { PUBLIC_URL } from '@/config/url.config'
import { AddToCardButton } from './AddToCardButton'
import { FavoriteButton } from './FavoriteButton'
import { getReviewWordWithEnding } from '@/utils/string/get-revew-word-with-ending'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface ProductInfoProps {
	product: IProduct
	currentColor: number
	setCurrentColor: (index: number) => void
}

export function ProductInfo({ product, currentColor, setCurrentColor }: ProductInfoProps) {
	const searchParams = useSearchParams()
	const size = Number(searchParams.get('size'))

	const router = useRouter()
	const pathname = usePathname()

	const [currentSize, setCurrentSize] = useState(size || 0)

	const rating = Math.round(product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length) || 0

	const safeColorIndex = Math.min(currentColor ?? 0, product.colors.length - 1)

	const safeSizeIndex = Math.min(currentSize ?? 0, product.size.length - 1)

	const updateUrlParams = (color: number, size: number) => {
		const params = new URLSearchParams(searchParams.toString())
		params.set('color', String(color))
		params.set('size', String(size))
		router.push(`${pathname}?${params.toString()}`, { scroll: false })
	}

	const handleColorChange = (index: number) => {
		setCurrentColor(index)
		updateUrlParams(index, currentSize)
	}

	const handleSizeChange = (index: number) => {
		setCurrentSize(index)
		updateUrlParams(currentColor, index)
	}

	return (
		<div className={styles.product_info}>
			<h1 className={styles.title}>{product.title}</h1>
			<div className={styles.price}>
				<ProductCardCurrency price={product.prices} />
			</div>
			<hr />
			<p className={styles.description}>{product.description}</p>
			<hr />
			<div className={styles.label}>
				<h3>Цвет: {product.colors[currentColor].name} </h3>
				<div className={styles.select_wrapper}>
					{product.colors.map((color, index) => (
						<button
							key={index}
							onClick={() => handleColorChange(index)}
							className={cn(styles.item, index === safeColorIndex ? 'border-primary' : 'border-transparent')}
							title={color.name}
						>
							<Image src={color.images[0].url} alt={product.title} width={50} height={50} />
						</button>
					))}
				</div>
			</div>
			<div className={styles.label}>
				<h3>Размер: {product.size[currentSize]} </h3>
				<div className={styles.select_wrapper}>
					{product.size.map((item, index) => (
						<button
							key={index}
							onClick={() => handleSizeChange(index)}
							className={cn(styles.item, index === currentSize ? 'border-primary' : 'border-transparent', 'flex justify-center items-center')}
							title={item}
						>
							<div className={styles.size}>{item}</div>
						</button>
					))}
				</div>
			</div>
			<div className={styles.label}>
				<h3>Категория: </h3>
				<Link className='text-sm' href={PUBLIC_URL.category(product.category.id)}>
					{product.category.title}
				</Link>
			</div>
			<div className={styles.label}>
				<h3>Средний рейтинг: </h3>
				<div className='text-sm'>
					⭐ {rating.toFixed(1)} | {getReviewWordWithEnding(product.reviews.length)}
				</div>
			</div>
			<hr />
			<div className={styles.action}>
				<AddToCardButton product={product} currentColor={safeColorIndex} currentSize={safeSizeIndex} />
				<FavoriteButton product={product} />
			</div>
		</div>
	)
}
