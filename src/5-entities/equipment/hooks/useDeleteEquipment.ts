import { equipmentApi } from '@/6-shared/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDeleteEquipment = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (id: number) => equipmentApi.deleteEquipment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipment'] });
      toast.success('Успешно удален');
    },
    onError: (error) => {
      toast.error(`Ошибка: ${error}`);
    },
  });

  return { mutate, isPending, error };
};
