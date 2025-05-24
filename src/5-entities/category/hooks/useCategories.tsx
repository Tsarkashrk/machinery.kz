import { useQuery } from '@tanstack/react-query'

import { categoriesApi } from '@/6-shared/api'
import { ICategory } from '../model/category.model'

export function useCategories() {
  const { data, isLoading, isSuccess } = useQuery<ICategory[]>({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.getCategories(),
  })

  return { categories: data, isLoading, isSuccess }
}
