import { IRequestPurchase, purchaseApi } from '@/6-shared/api';
import { useMutation } from '@tanstack/react-query';

export const useRequestPurchase = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: IRequestPurchase) => purchaseApi.requestPurchase(data),
  });

  return { mutate, isPending, error };
};
