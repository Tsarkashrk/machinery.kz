import { purchaseApi } from '@/6-shared/api';
import { useMutation } from '@tanstack/react-query';

type Props = {
  id: number;
  data: any;
};

export const useCancelPurchase = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ id, data }: Props) => purchaseApi.cancelPurchase(id),
  });

  return { mutate, isPending, error };
};
