'use client'

import { useState, type PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'

import { Toaster } from 'react-hot-toast'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '@/store/store'

export function Providers({ children }: PropsWithChildren) {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false,
				},
			},
		})
	)

	return (
		<QueryClientProvider client={client}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Toaster />
					{children}
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	)
}
