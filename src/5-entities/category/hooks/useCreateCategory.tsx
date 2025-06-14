import { categoriesApi, CategoryType } from '@/6-shared/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useCreateCategory = (type: CategoryType) => {
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: (data: FormData) => categoriesApi.createCategory(type, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Категория успешно создана');
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });

  return { mutate, isSuccess, isPending };
};
