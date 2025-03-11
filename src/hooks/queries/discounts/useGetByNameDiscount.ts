import { discountService } from '@/services/discount.service'
import { useMutation } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export const useGetByNameDiscount = () => {
	const {
		mutate: getDiscountByName,
		data: discount,
		isPending: isLoadingDiscount,
	} = useMutation({
		mutationKey: ['get discounts by name'],
		mutationFn: (name: string) => discountService.getByName(name),

		onSuccess(data) {
			if (data.quantity === 0) {
				toast.error('Закончилось количество использований')
			} else {
				toast.success('Промокод использован')
			}
		},

		onError() {
			toast.error('Промокод не найден или количество использований истекло')
		},
	})

	return useMemo(() => ({ getDiscountByName, discount, isLoadingDiscount }), [getDiscountByName, discount, isLoadingDiscount])
}
