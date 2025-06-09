import { IRentEquipment, rentApi } from '@/6-shared/api';
import { useMutation } from '@tanstack/react-query';

export const useRequestRental = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: IRentEquipment) => rentApi.requestRental(data),
  });

  return { mutate, isPending, error };
};
