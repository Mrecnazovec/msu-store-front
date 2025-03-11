import { userService } from '@/services/user.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export const useUpdateUserRole = () => {
	const queryClient = useQueryClient()

	const { mutate: updateUser, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update user role'],
		mutationFn: ({ data, userId }: { data: string; userId: string }) => userService.updateRole(userId, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get users for store dashboard'],
			})
			toast.success('Роль пользователя обновлёна')
		},
		onError() {
			toast.error('Ошибка при обновлении роли пользователя')
		},
	})

	return useMemo(() => ({ updateUser, isLoadingUpdate }), [updateUser, isLoadingUpdate])
}
