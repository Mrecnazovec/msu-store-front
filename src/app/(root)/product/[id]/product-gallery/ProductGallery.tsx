import { IProduct } from '@/shared/types/product.interface'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from './ProductGallery.module.scss'
import { cn } from '@/lib/utils'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/Carousel'

interface ProductGalleryProps {
	product: IProduct
	currentColor: number
}

export function ProductGallery({ product, currentColor }: ProductGalleryProps) {
	const [currentIndex, setCurrentIndex] = useState(0)

	useEffect(() => setCurrentIndex(0), [currentColor])

	const safeColorIndex = Math.min(currentColor ?? 0, product.colors.length - 1)

	return (
		<div>
			<Image
				src={
					product.colors[safeColorIndex].images[currentIndex]?.url
						? product.colors[safeColorIndex].images[currentIndex].url
						: product.colors[safeColorIndex].images[0].url
				}
				alt={product.title}
				width={500}
				height={500}
				className={styles.image}
			/>

			<Carousel
				opts={{
					align: 'start',
				}}
			>
				<CarouselContent className={styles.gallery}>
					{product.colors[safeColorIndex].images.map((image, index) => (
						<CarouselItem key={index} className={styles.carousel_item}>
							<button
								onClick={() => setCurrentIndex(index)}
								className={cn(styles.item, index === currentIndex ? 'border-primary' : 'border-transparent')}
							>
								<Image src={image.url} alt={product.title} width={100} height={100} />
							</button>
						</CarouselItem>
					))}
				</CarouselContent>
				{product.colors[safeColorIndex].images.length > 4 && (
					<>
						<CarouselPrevious />
						<CarouselNext />
					</>
				)}
			</Carousel>
		</div>
	)
}
