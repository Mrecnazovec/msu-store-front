import { userService } from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useGetUsers = () => {
	const { data: users, isLoading } = useQuery({
		queryKey: ['get users for store dashboard'],
		queryFn: () => userService.getAll(),
	})

	return useMemo(() => ({ users, isLoading }), [users, isLoading])
}
