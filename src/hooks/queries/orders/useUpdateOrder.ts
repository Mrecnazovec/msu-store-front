import { orderService } from '@/services/order.service'
import { EnumOrderStatus } from '@/shared/types/order.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export const useUpdateOrder = () => {
	const queryClient = useQueryClient()

	const { mutate: updateOrder, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update order'],
		mutationFn: ({ status, orderId }: { status: EnumOrderStatus; orderId: string }) => orderService.updateOrderStatus(orderId, status),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get orders for store dashboard'],
			})
			toast.success('Статус заказа обновлён')
		},
		onError() {
			toast.error('Ошибка при обновлении статуса заказа')
		},
	})

	return useMemo(() => ({ updateOrder, isLoadingUpdate }), [updateOrder, isLoadingUpdate])
}
