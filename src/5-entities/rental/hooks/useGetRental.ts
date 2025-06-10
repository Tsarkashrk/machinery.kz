import { rentApi } from '@/6-shared/api';
import { useQuery } from '@tanstack/react-query';

export const useGetRental = (id: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [`rental-${id}`],
    queryFn: () => rentApi.getRentalTransaction(id),
    enabled: !!id,
  });

  return { rentalTransaction: data, isLoading, error };
};
