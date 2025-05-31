import { categoriesApi } from '@/6-shared/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ICategoryRequest } from '../model/category.model'
import { toast } from 'sonner'

type Props = {
  id: number
  data: ICategoryRequest
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  const {} = useMutation({
    mutationFn: ({ id, data }: Props) => categoriesApi.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (error) => {
      toast.error(`${error}`)
    },
  })
}
