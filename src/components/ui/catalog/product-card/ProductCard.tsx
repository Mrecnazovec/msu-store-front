import { IProduct } from '@/shared/types/product.interface'
import styles from './ProductCard.module.scss'
import Link from 'next/link'
import { PUBLIC_URL } from '@/config/url.config'
import Image from 'next/image'
import { ProductCardCurrency } from './ProductCardCurrency'

interface ProductCardProps {
	product: IProduct
}

export function ProductCard({ product }: ProductCardProps) {
	return (
		<div className={styles.card}>
			<Link href={PUBLIC_URL.product(product.id)}>
				<Image src={product.colors[0].images[0].url} alt={product.title} width={300} height={300} />
			</Link>
			{/* <div className={styles.color_wrapper}>
				{product.colors.map((color, index) => (
					<div key={index}>
						<Image alt={color.name} src={color.images[0].url} width={40} height={40} />
					</div>
				))}
			</div> */}
			<h3 className={styles.title}>{product.title}</h3>
			<Link href={PUBLIC_URL.category(product.category.id)} className={styles.category}>
				{product.category.title}
			</Link>
			<div className={styles.price}>
				<ProductCardCurrency price={product.prices} />
			</div>
		</div>
	)
}
