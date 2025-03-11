import { StoreLayout } from '@/components/layouts/store-layout/StoreLayout'
import type { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return <StoreLayout>{children}</StoreLayout>
}
