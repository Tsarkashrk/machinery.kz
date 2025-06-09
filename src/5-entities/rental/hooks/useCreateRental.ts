import { IRentEquipment, rentApi } from '@/6-shared/api';
import { useMutation } from '@tanstack/react-query';

export const useCreateRental = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: IRentEquipment) => rentApi.rentEquipment(data),
  });

  return { mutate, isPending, error };
};
