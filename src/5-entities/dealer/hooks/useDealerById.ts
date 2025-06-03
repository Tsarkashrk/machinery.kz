import { usersApi } from '@/6-shared/api'
import { useQuery } from '@tanstack/react-query'

export const useDealerById = (id: number) => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['dealer', id],
    queryFn: () => usersApi.getUserById(id),
  })

  return { user: data, isLoading, isSuccess }
}
