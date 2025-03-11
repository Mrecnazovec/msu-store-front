import { ICategory } from './category.interface'
import { IColorInput } from './color.interface'
import { IPrice, IPriceInput } from './price.interface'
import { IReview } from './review.interface'

export interface IProduct {
	id: string
	title: string
	description: string
	prices: IPriceInput[]
	size: string[]
	colors: IColorInput[]
	category: ICategory
	reviews: IReview[]
	storeId: string
}

export interface IProductInput extends Omit<IProduct, 'id' | 'reviews' | 'store' | 'category' | 'storeId'> {
	categoryId: string
}
