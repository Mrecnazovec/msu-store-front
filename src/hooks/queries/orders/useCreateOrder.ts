import { orderService } from '@/services/order.service'
import { EnumOrderStatus, IOrderInput } from '@/shared/types/order.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export const useCreateOrder = () => {
	const queryClient = useQueryClient()

	const { mutate: createOrder, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create order'],
		mutationFn: (data: IOrderInput) => orderService.createOrder(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['profile'],
			})
			toast.success('Заказ создан')
		},
		onError() {
			toast.error('Ошибка при создании заказа')
		},
	})

	return useMemo(() => ({ createOrder, isLoadingCreate }), [createOrder, isLoadingCreate])
}
