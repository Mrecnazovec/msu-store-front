import { STORE_URL } from '@/config/url.config'
import { discountService } from '@/services/discount.service'
import { IDiscountInput } from '@/shared/types/discount.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export const useCreateDiscount = () => {
	const params = useParams<{ storeId: string }>()
	const router = useRouter()

	const queryClient = useQueryClient()

	const { mutate: createDiscount, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create discount'],
		mutationFn: (data: IDiscountInput) => discountService.create(data, params.storeId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get discounts for store dashboard'],
			})
			toast.success('Промокод создан')
			router.push(STORE_URL.discounts(params.storeId))
		},
		onError() {
			toast.error('Ошибка при создании промокода')
		},
	})

	return useMemo(() => ({ createDiscount, isLoadingCreate }), [createDiscount, isLoadingCreate])
}
