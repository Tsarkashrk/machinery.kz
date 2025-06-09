import { purchaseApi } from '@/6-shared/api';
import { useQuery } from '@tanstack/react-query';

export const useGetPurchaseList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['purchase-list'],
    queryFn: () => purchaseApi.getAll(),
  });

  return { purchaseList: data, isLoading, error };
};
