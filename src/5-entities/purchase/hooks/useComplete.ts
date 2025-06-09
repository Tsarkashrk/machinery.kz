import { ICompletePurchase, purchaseApi } from '@/6-shared/api';
import { useMutation } from '@tanstack/react-query';

type Props = {
  id: number;
  data: ICompletePurchase;
};

export const useComplete = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ id, data }: Props) => purchaseApi.completePurchase(id, data),
  });

  return { mutate, isPending, error };
};
