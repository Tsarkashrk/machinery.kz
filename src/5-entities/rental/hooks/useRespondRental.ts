import { IRespondRequest, rentApi } from '@/6-shared/api';
import { useMutation } from '@tanstack/react-query';

type Props = {
  id: number;
  data: IRespondRequest;
};

export const useRespondRental = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ id, data }: Props) =>
      rentApi.respondToRentalRequest(id, data),
  });

  return { mutate, isPending, error };
};
