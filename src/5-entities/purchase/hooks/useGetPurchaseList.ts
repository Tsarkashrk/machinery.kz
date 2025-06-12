import { purchaseApi } from '@/6-shared/api';
import { useQuery } from '@tanstack/react-query';

export const useGetPurchaseList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['purchase-list'],
    queryFn: () => purchaseApi.getAll(),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    staleTime: 10 * 1000, // 10 секунд
    gcTime: 5 * 60 * 1000, // 5 минут
    retry: 2,
  });

  return { purchaseList: data, isLoading, error };
};
