import { geoService } from '@/services/geo/geo.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export function useSwitchGeo() {
	const queryClient = useQueryClient()

	const { mutate: switchGeo, isPending: isSwitchGeo } = useMutation({
		mutationKey: ['switch geo'],
		mutationFn: (data: string) => geoService.switch(data),
		onSuccess(data) {
			queryClient.invalidateQueries({
				queryKey: ['geo'],
			})

			

			toast.success(`${data} теперь основная валюта`)
		},
		onError() {
			toast.error('Не удалось изменить валюту')
		},
	})

	return useMemo(() => ({ switchGeo, isSwitchGeo }), [switchGeo, isSwitchGeo])
}
