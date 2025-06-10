import { rentApi } from '@/6-shared/api';
import { useQuery } from '@tanstack/react-query';

export const useMyTransactions = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['my-transactions'],
    queryFn: () => rentApi.myTransactions(),
  });
  return { data, isLoading, error };
};
