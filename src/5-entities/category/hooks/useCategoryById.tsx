import { useQuery } from '@tanstack/react-query';

import { categoriesApi } from '@/6-shared/api';
import { ICategory } from '../model/category.model';

export function useCategoryById(id: number) {
  const { data, isLoading, isSuccess } = useQuery<ICategory>({
    queryKey: ['category'],
    queryFn: () => categoriesApi.getCategoryById('equipment', id),
  });

  return { category: data, isLoading, isSuccess };
}
