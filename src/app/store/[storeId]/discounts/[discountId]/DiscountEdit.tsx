'use client'

import { discountService } from '@/services/discount.service'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { DiscountForm } from '../DiscountForm'

export function DiscountEdit() {
	const params = useParams<{ discountId: string }>()

	const { data } = useQuery({
		queryKey: ['get discount'],
		queryFn: () => discountService.getById(params.discountId),
	})

	return <DiscountForm discount={data} />
}
