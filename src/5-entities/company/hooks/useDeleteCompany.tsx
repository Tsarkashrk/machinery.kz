import { companiesApi } from '@/6-shared/api/companies'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteCompany = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (companyId: number) => companiesApi.deleteCompany(companyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] })
      console.log('Company deleted successfully!')
    },
    onError: (error) => {
      console.error('Failed to delete company:', error)
    },
  })
}
