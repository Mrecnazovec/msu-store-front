import { statisticsService } from '@/services/statistics.service'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { useGeo } from '../queries/geo/useGeo'

export const useGetStatistics = () => {
	const { geo } = useGeo()
	const params = useParams<{ storeId: string }>()

	const { data: main, isLoading: mainStatisticsLoading } = useQuery({
		queryKey: ['get main statistics', params.storeId, geo],
		queryFn: () => statisticsService.getMain(`${params.storeId}/${geo}`),
		enabled: !!geo,
	})

	const { data: middle, isLoading: middleStatisticsLoading } = useQuery({
		queryKey: ['get middle statistics', params.storeId, geo],
		queryFn: () => statisticsService.getMiddle(`${params.storeId}/${geo}`),
		enabled: !!geo,
	})

	return useMemo(
		() => ({ main, middle, mainStatisticsLoading, middleStatisticsLoading }),
		[main, middle, mainStatisticsLoading, middleStatisticsLoading]
	)
}
