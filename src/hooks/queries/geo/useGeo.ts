import { geoService } from '@/services/geo/geo.service'
import { useQuery } from '@tanstack/react-query'

export function useGeo() {
	const { data, isLoading } = useQuery({
		queryKey: ['geo'],
		queryFn: () => geoService.getGeo(),
	})

	const geo = data ?? 'UZS'

	return { geo, isLoading }
}
