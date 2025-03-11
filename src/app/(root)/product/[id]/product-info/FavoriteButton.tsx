'use client'

import { Button } from '@/components/ui/Button'
import { useProfile } from '@/hooks/useProfile'
import { userService } from '@/services/user.service'
import { IProduct } from '@/shared/types/product.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Heart, HeartOff } from 'lucide-react'

interface FavoriteButtonProps {
	product: IProduct
}

export function FavoriteButton({ product }: FavoriteButtonProps) {
	const { user } = useProfile()

	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['toggle favorite'],
		mutationFn: () => userService.toggleFavorite(product.id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['profile'],
			})
		},
	})

	if (!user) return null

	const isExist = user.favorites.some((favorite) => favorite.id === product.id)

	return <Button variant='secondary' size='icon' onClick={() => mutate()} disabled={isPending}>
		{!isExist ? (
			<Heart className='size-5'/>
		) : <HeartOff className='size-5'/>}
	</Button>
}
