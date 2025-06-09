import { purchaseApi } from '@/6-shared/api';
import { useQuery } from '@tanstack/react-query';

export const useGetPurchase = (id: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [`purchase-${id}`],
    queryFn: () => purchaseApi.getById(id),
  });

  return { purchaseTransaction: data, isLoading, error };
};
