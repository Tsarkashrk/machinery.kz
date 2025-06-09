import { IReportIssue, purchaseApi } from '@/6-shared/api';
import { useMutation } from '@tanstack/react-query';

type Props = {
  id: number;
  data: IReportIssue;
};

export const useReportIssue = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ id, data }: Props) => purchaseApi.reportIssue(id, data),
  });

  return { mutate, isPending, error };
};
