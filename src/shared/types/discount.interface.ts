export interface IDiscount {
	id: string
	createdAt: string
	name: string
	discount: number
	quantity: number
	storeId: string
}

export interface IDiscountInput extends Pick<IDiscount, 'name' | 'discount' | 'quantity'> {}
