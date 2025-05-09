import { dealersApi } from '@/shared/api/dealers.api'
import { useQuery } from '@tanstack/react-query'

export const useDealersList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dealers'],
    queryFn: dealersApi.getDealers,
  })

  return {
    dealers: data || [],
    isLoading,
    error,
  }
}
