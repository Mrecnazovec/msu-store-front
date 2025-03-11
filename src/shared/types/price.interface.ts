export interface IPrice {
	id: string
	createdAt: string
	currency: string
	price: number
	productId: string
}

export interface IPriceInput extends Pick<IPrice, 'currency' | 'price'> {}	
