import { EnumUserRoles, IUser, IUserRequest } from '@/5-entities/user'
import { adminApi } from '@/6-shared/api/admin.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IUserUpdateRole } from '../model/admin.model'

type Props = {
  id: number
  data: IUserUpdateRole
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: ({ id, data }: Props) => adminApi.editUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return { mutate, isPending, isSuccess }
}
