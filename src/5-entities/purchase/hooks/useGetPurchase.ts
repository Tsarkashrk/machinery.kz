import { purchaseApi } from '@/6-shared/api';
import { useQuery } from '@tanstack/react-query';

export const useGetPurchase = (id: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [`purchase-${id}`],
    queryFn: () => purchaseApi.getById(id),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    staleTime: 10 * 1000, // 10 секунд
    gcTime: 5 * 60 * 1000, // 5 минут
    retry: 2,
  });

  return { purchaseTransaction: data, isLoading, error };
};
