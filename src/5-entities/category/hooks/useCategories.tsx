import { useQuery } from "@tanstack/react-query";

import { categoriesApi } from "@/6-shared/api";
import { ICategory } from "../model/category.model";

type Props = {
  ordering?: string;
  page?: number;
  search?: string;
};

export function useCategories(params: Props) {
  const { data, isLoading, isSuccess } = useQuery<ICategory[]>({
    queryKey: ["categories"],
    queryFn: () => categoriesApi.getCategories(params),
  });

  return { categories: data, isLoading, isSuccess };
}
