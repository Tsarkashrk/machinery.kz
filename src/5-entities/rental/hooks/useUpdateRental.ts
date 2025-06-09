import { IRentEquipment, rentApi } from '@/6-shared/api';
import { useMutation } from '@tanstack/react-query';

type Props = {
  id: number;
  data: IRentEquipment;
};

export const useUpdateRental = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ id, data }: Props) =>
      rentApi.updateRentalTransaction(id, data),
  });

  return { mutate, isPending, error };
};
