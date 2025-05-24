import { useQuery } from '@tanstack/react-query'

import { profileApi } from '@/6-shared/api'
import { IUser } from '../model/user.model'

export function useProfile() {
  const { data, isLoading, isSuccess } = useQuery<IUser>({
    queryKey: ['profile'],
    queryFn: () => profileApi.getProfile(),
  })

  return { profile: data, isLoading, isSuccess }
}
