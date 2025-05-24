import { useQuery } from '@tanstack/react-query'

import { brandsApi } from '@/6-shared/api/brands.api'
import { IBrand } from '../model/brand.model'

export function useBrandSearch(slug: string) {
  const { data, isLoading, isSuccess } = useQuery<IBrand[]>({
    queryKey: ['brand-search', slug],
    queryFn: () => brandsApi.getBrandBySearch(slug),
    enabled: !!slug,
  })

  const brand = data && data.length > 0 ? data[0] : null

  return {
    brand,
    brands: data || [],
    isLoading,
    isSuccess: isSuccess && !!brand,
  }
}
