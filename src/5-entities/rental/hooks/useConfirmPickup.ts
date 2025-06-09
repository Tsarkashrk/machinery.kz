import { IConfirmRentalPickup, rentApi } from '@/6-shared/api';
import { useMutation } from '@tanstack/react-query';

type Props = {
  id: number;
  data: IConfirmRentalPickup;
};

export const useConfirmPickup = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ id, data }: Props) => rentApi.confirmPickup(id, data),
  });

  return { mutate, isPending, error };
};
