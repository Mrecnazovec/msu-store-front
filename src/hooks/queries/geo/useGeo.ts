import { geoService } from '@/services/geo/geo.service'
import { useQuery } from '@tanstack/react-query'

export function useGeo() {


	const { data: geo, isLoading } = useQuery({
		queryKey: ['geo'],
		queryFn: () => geoService.getGeo(),
		
		
	})

	return { geo, isLoading }
}
