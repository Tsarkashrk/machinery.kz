import { categoriesApi } from '@/6-shared/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ICategoryRequest } from '../model/category.model'
import { toast } from 'sonner'

export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  const {} = useMutation({
    mutationFn: (data: ICategoryRequest) => categoriesApi.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (error) => {
      toast.error(`${error}`)
    },
  })
}
