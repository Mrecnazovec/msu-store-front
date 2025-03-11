import { discountService } from '@/services/discount.service'
import { IDiscountInput } from '@/shared/types/discount.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export const useUpdateDiscount = () => {
	const params = useParams<{ discountId: string }>()
	const queryClient = useQueryClient()

	const { mutate: updateDiscount, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update discount'],
		mutationFn: (data: IDiscountInput) => discountService.update(params.discountId, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get discounts for store dashboard'],
			})
			toast.success('Промокод обновлён')
		},
		onError() {
			toast.error('Ошибка при обновлении промокода')
		},
	})

	return useMemo(() => ({ updateDiscount, isLoadingUpdate }), [updateDiscount, isLoadingUpdate])
}
