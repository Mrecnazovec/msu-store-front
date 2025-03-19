import { IProduct } from '@/shared/types/product.interface'
import styles from './ProductReviews.module.scss'
import { useProfile } from '@/hooks/useProfile'
import { useDeleteReview } from '@/hooks/queries/reviews/useDeleteReview'
import { ReviewModal } from '@/components/ui/modals/ReviewModal'
import { Button } from '@/components/ui/Button'
import { Plus, Trash } from 'lucide-react'
import Image from 'next/image'
import { ConfirmModule } from '@/components/ui/modals/ConfirmModule'
import { Rating } from 'react-simple-star-rating'
import { getReviewWordWithEnding } from '@/utils/string/get-revew-word-with-ending'

interface ProductReviewsProps {
	product: IProduct
}

export function ProductReviews({ product }: ProductReviewsProps) {
	const { user } = useProfile()

	const { deleteReview } = useDeleteReview()

	return (
		<div className='mt-6'>
			<div className={styles.header}>
				<h1>{getReviewWordWithEnding(product.reviews.length)}</h1>
				{user && (
					<ReviewModal storeId={product.storeId}>
						<Button className='p-2 sm:px-4'>
							<Plus/>
							<p className='hidden sm:block'>Добавить отзыв</p>
						</Button>
					</ReviewModal>
				)}
			</div>
			<div className={styles.reviews}>
				{product.reviews.length ? (
					product.reviews.map((review) => (
						<div key={review.id} className={styles.review}>
							<div className={styles.header}>
								<div className={styles.user}>
									<Image src={review.user.picture} alt={review.user.name} width={40} height={40} />
									{review.user.name}
									{review.user.id === user?.id && (
										<ConfirmModule handleClick={() => deleteReview(review.id)}>
											<button className={styles.delete}>
												<Trash />
											</button>
										</ConfirmModule>
									)}
								</div>
							</div>
							<Rating readonly initialValue={review.rating} SVGstyle={{ display: 'inline-block' }} size={18} allowFraction transition />
							<div className={styles.text}>{review.text}</div>
						</div>
					))
				) : (
					<div className={styles.not_found}>У этого товара пока нет пользователей</div>
				)}
			</div>
		</div>
	)
}
