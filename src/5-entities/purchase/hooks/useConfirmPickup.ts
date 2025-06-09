import { IConfirmPurchasePickup, purchaseApi } from '@/6-shared/api';
import { useMutation } from '@tanstack/react-query';

type Props = {
  id: number;
  data: IConfirmPurchasePickup;
};

export const useConfirmPickup = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ id, data }: Props) => purchaseApi.confirmPickup(id, data),
  });

  return { mutate, isPending, error };
};
