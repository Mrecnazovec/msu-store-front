import { orderService } from '@/services/order.service'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useGetOrders = () => {
	const { data: orders, isLoading } = useQuery({
		queryKey: ['get orders for store dashboard'],
		queryFn: () => orderService.getAllOrders(),
	})

	return useMemo(() => ({ orders, isLoading }), [orders, isLoading])
}
