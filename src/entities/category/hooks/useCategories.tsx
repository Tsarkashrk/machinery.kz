import { useQuery } from '@tanstack/react-query'

import { profileApi } from '@/shared/api'

export function useCategories() {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['profile'],
    queryFn: () => profileApi.getProfile(),
  })

  return { data, isLoading, isSuccess }
}
