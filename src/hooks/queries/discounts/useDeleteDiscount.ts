import { STORE_URL } from '@/config/url.config'
import { discountService } from '@/services/discount.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export const useDeleteDiscount = () => {
	const params = useParams<{ storeId: string; discountId: string }>()
	const router = useRouter()

	const queryClient = useQueryClient()

	const { mutate: deleteDiscount, isPending: isLoadingDelete } = useMutation({
		mutationKey: ['delete discount'],
		mutationFn: () => discountService.delete(params.discountId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get discounts for store dashboard'],
			})
			toast.success('Промокод удалён')
			router.push(STORE_URL.discounts(params.storeId))
		},
		onError() {
			toast.error('Ошибка при удалении промокод')
		},
	})

	return useMemo(() => ({ deleteDiscount, isLoadingDelete }), [deleteDiscount, isLoadingDelete])
}
