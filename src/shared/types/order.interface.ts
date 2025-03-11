import { ICartItem } from './cart.interface'
import { IProduct } from './product.interface'
import { IUser } from './user.interface'

export enum EnumOrderStatus {
	PENDING = 'PENDING',
	CONFIRMED = 'CONFIRMED',
	CANCELED = 'CANCELED',
	SHIPPED = 'SHIPPED',
	DELIVERED = 'DELIVERED',
	PAYED = 'PAYED',
}

export interface IOrder {
	id: string
	createdAt: string
	items: IOrderItem[]
	status: EnumOrderStatus
	user: IUser
	total: number
	currency: string
	discount: number
}

export interface IOrderItem {
	productId: string,
	quantity: number,
	size: string,
	storeId: string,
	color: string
	price: number
	id: string
	product: IProduct
}

export interface IOrderInput extends Pick<IOrder, 'items' | 'currency' | 'discount'> {}
export interface IOrderStatus extends Pick<IOrder, 'status'> {}
