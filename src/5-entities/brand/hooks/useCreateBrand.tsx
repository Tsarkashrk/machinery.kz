import { brandsApi } from '@/6-shared/api/brands.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IBrandRequest } from '../model/brand.model'
import { toast } from 'sonner'

export const useCreateBrand = () => {
  const queryClient = useQueryClient()

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: IBrandRequest) => brandsApi.createBrand(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] })
      toast.success('Компания успешно создана')
    },
  })
  return { mutate, isPending, isSuccess }
}
