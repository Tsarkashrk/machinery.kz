import { companiesApi } from '@/6-shared/api/companies'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ICompanyPostRequest } from '../model/company.model'
import { toast } from 'sonner'

export const useCreateCompany = () => {
  const queryClient = useQueryClient()

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: ICompanyPostRequest) => companiesApi.createCompany(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] })
      toast.success('Компания успешно создана')
    },
    onError: (error) => {
      toast.error(`${error}`)
    },
  })

  return { mutate, isPending, isSuccess }
}
