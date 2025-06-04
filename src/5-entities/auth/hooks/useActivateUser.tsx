import { authApi } from '@/6-shared/api'
import { useQuery } from '@tanstack/react-query'

export const useActivateUser = (token: string | null) => {
  const { data, isLoading, isSuccess, error } = useQuery({
    queryKey: ['activate', token],
    queryFn: () => authApi.activateUser(token),
    enabled: !!token, 
    retry: false,
  })

  return { data, isLoading, isSuccess, error }
}
