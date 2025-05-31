import { companiesApi } from '@/6-shared/api/companies'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ICompanyEditRequest } from '../model/company.model'

type Props = {
  id: number
  data: any
}

export const useUpdateCompany = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: Props) => companiesApi.updateCompany(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] })
    },
  })
}
