import Link from 'next/link'
import { ICatalog } from './catalog.interface'

import styles from './Catalog.module.scss'
import { ProductCard } from './product-card/ProductCard'

export function Catalog({ products, title, description, link, linkTitle }: ICatalog) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div className={styles.info}>
					<h1>{title}</h1>
					{description && <p>{description}</p>}
				</div>
				{link && linkTitle && <Link className={styles.link} href={link}>{linkTitle}</Link>}
			</div>

			<div className={styles.catalog}>
				<div className={styles.products}>
					{products.length ? products.map((product) => <ProductCard key={product.id} product={product} />) : <div>Ничего не найдено</div>}
				</div>
			</div>
		</div>
	)
}
