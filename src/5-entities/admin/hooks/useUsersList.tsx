import { adminApi } from '@/6-shared/api/admin.api'
import {  useQuery } from '@tanstack/react-query'

export const useUsersList = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['users'],
    queryFn: adminApi.getAllUsers,
  })

  return { usersList: data, isLoading, isSuccess }
}
