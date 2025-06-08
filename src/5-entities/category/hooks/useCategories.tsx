import { useQuery } from '@tanstack/react-query';

import { categoriesApi, CategoryType } from '@/6-shared/api';
import { ICategory } from '../model/category.model';

type Props = {
  ordering?: string;
  page?: number;
  search?: string;
};

export function useCategories(type: CategoryType, params?: Props) {
  const { data, isLoading, isSuccess } = useQuery<ICategory[]>({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.getCategories(type, params),
  });

  return { categories: data, isLoading, isSuccess };
}
