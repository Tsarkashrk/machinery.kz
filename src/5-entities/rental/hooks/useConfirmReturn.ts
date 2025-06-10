import { IConfirmReturn, rentApi } from '@/6-shared/api';
import { useMutation } from '@tanstack/react-query';

type Props = {
  id: number;
  data: IConfirmReturn;
};

export const useConfirmReturn = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ id, data }: Props) => rentApi.confirmReturn(id, data),
  });

  return { mutate, isPending, error };
};
