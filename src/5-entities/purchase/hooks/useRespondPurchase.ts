import { IPurchaseRespondRequest, purchaseApi } from '@/6-shared/api';
import { useMutation } from '@tanstack/react-query';

type Props = {
  id: number;
  data: IPurchaseRespondRequest;
};

export const useRespondPurchase = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ id, data }: Props) =>
      purchaseApi.respondToPurchaseRequest(id, data),
  });

  return { mutate, isPending, error };
};
