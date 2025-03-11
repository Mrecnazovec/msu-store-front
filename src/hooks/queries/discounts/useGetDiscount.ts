import { discountService } from '@/services/discount.service'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useGetDiscounts = () => {
	const { data: discounts, isLoading } = useQuery({
		queryKey: ['get discounts for store dashboard'],
		queryFn: () => discountService.getAll(),
	})

	return useMemo(() => ({ discounts, isLoading }), [discounts, isLoading])
}
