import { categoriesApi, CategoryType } from '@/6-shared/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

type Props = {
  id: number;
  data: FormData;
};

export const useUpdateCategory = (type: CategoryType) => {
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: ({ id, data }: Props) =>
      categoriesApi.updateCategory(type, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });

  return { mutate, isSuccess, isPending };
};
