import { usersApi } from '@/6-shared/api'
import { useQuery } from '@tanstack/react-query'

export const useUsersList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: usersApi.getUsers,
  })

  return {
    users: data || [],
    isLoading,
    error,
  }
}
