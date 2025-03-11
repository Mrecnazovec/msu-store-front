import { IPrice, IPriceInput } from './price.interface'
import { IProduct } from './product.interface'

export interface ICartItem {
	id: string
	product: IProduct
	quantity: number
	price: IPriceInput[]
	currentColor: number
	currentSize: number
}

export interface ICartItemColumn extends Omit<ICartItem, 'currentColor' | 'currentSize' | 'price'> {
	color: string
	price: number
	size: string
}
