import { IRentalRespondRequest, rentApi } from '@/6-shared/api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type Props = {
  id: number;
  data: IRentalRespondRequest;
};

export const useRespondRental = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ id, data }: Props) =>
      rentApi.respondToRentalRequest(id, data),
    onSuccess: () => {
      toast.success('Транзакция подтверждена')
    }
  });

  return { mutate, isPending, error };
};
