import { adminApi } from '@/6-shared/api/admin.api'
import { companiesApi } from '@/6-shared/api/companies'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => adminApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User deleted successfully!')
    },
    onError: (error) => {
      toast.error(`Failed to delete user: ${error}`)
    },
  })
}
