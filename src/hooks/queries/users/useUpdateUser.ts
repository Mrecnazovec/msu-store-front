import { userService } from '@/services/user.service'
import { IUserInput } from '@/shared/types/user.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export const useUpdateUser = () => {
	const queryClient = useQueryClient()

	const { mutateAsync: updateUser, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update user'],
		mutationFn: (data: IUserInput) => userService.update(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['profile'],
			})
			toast.success('Данные обновлены')
		},
		onError() {
			toast.error('Ошибка при обновлении данных')
		},
	})

	return useMemo(() => ({ updateUser, isLoadingUpdate }), [updateUser, isLoadingUpdate])
}
