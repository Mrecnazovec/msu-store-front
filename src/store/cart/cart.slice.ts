import type { IAddToCardPayload, ICartInitialState, IChangeQuantityPayload } from './cart.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ICartInitialState = {
	items: [],
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCard: (state, action: PayloadAction<IAddToCardPayload>) => {
			const isExist = state.items.some(
				(item) =>
					item.product.id === action.payload.product.id &&
					item.currentColor === action.payload.currentColor &&
					item.currentSize === action.payload.currentSize
			)

			if (!isExist) state.items.push({ ...action.payload, id: crypto.randomUUID() })
		},

		removeFromCard: (state, action: PayloadAction<{ id: string }>) => {
			state.items = state.items.filter((item) => item.id !== action.payload.id)
		},

		changeQuantity: (state, action: PayloadAction<IChangeQuantityPayload>) => {
			const { id, type } = action.payload
			const item = state.items.find((item) => item.id === id)
			if (item) type === 'plus' ? item.quantity++ : item.quantity--
		},

		reset: (state) => {
			state.items = []
		},
	},
})
