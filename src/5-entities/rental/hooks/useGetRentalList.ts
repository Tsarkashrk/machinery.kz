import { rentApi } from '@/6-shared/api';
import { useQuery } from '@tanstack/react-query';

export const useGetRentalList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['rental-list'],
    queryFn: () => rentApi.getRentalList(),
  });

  return { rentalList: data, isLoading, error };
};
