import { rentApi } from '@/6-shared/api';
import { useMutation } from '@tanstack/react-query';

export const useCancelRental = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (id: number) => rentApi.cancelRental(id),
  });

  return { mutate, isPending, error };
};
