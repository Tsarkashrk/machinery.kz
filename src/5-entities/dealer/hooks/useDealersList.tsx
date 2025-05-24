import { dealersApi } from '@/6-shared/api'
import { useQuery } from '@tanstack/react-query'

export const useDealersList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dealers'],
    queryFn: dealersApi.getDealers,
  })

  return {
    data,
    isLoading,
    error,
  }
}
