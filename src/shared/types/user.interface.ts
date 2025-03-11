import { IOrder } from './order.interface'
import { IProduct } from './product.interface'
import { IStore } from './store.interface'

export interface IUser {
	id: string
	name: string
	email: string
	phone: string
	social: string
	picture: string
	role: string
	discountArch: string[]
	favorites: IProduct[]
	orders: IOrder[]
	stores: IStore[]
}

export interface IUserInput extends Pick<IUser, 'name' | 'email' | 'picture' | 'phone' | 'social' | 'discountArch'> {}
export interface IUserRole extends Pick<IUser, 'role'> {}
