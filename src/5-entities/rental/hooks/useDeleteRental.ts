import { IRentEquipment, rentApi } from '@/6-shared/api';
import { useMutation } from '@tanstack/react-query';

type Props = {
  id: number;
};

export const useDeleteRental = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ id }: Props) => rentApi.deleteRentalTransaction(id),
  });

  return { mutate, isPending, error };
};
