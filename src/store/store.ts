import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import { cartSlice } from './cart/cart.slice'

// Функция для определения Storage в зависимости от среды
const createNoopStorage = () => ({
	getItem: async () => null,
	setItem: async () => {},
	removeItem: async () => {},
})

const isClient = typeof window !== 'undefined'
const storage = isClient ? require('redux-persist/lib/storage').default : createNoopStorage()

const persistConfig = {
	key: 'msu-store',
	storage,
	whitelist: ['cart'],
}

const rootReducer = combineReducers({
	cart: cartSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})

export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof rootReducer>
