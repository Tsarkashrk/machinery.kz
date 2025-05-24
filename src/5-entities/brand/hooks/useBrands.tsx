import { useQuery } from '@tanstack/react-query'

import { brandsApi } from '@/6-shared/api/brands.api'
import { IBrand } from '../model/brand.model'

export function useBrands() {
  const { data, isLoading, isSuccess } = useQuery<IBrand[]>({
    queryKey: ['brands'],
    queryFn: () => brandsApi.getBrands(),
  })

  return { brands: data, isLoading, isSuccess }
}
