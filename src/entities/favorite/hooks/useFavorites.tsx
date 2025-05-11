import { favoritesApi } from '@/shared/api'
import { useQuery } from '@tanstack/react-query'

export const useFavorites = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['favorites'],
    queryFn: favoritesApi.getFavorites,
  })

  return {
    favorites: data || [],
    isLoading,
    error,
  }
}
