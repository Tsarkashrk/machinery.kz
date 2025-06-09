import { moderatorApi } from '@/6-shared/api/moderator.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useVerifyEquipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (equipmentId: number) =>
      moderatorApi.confirmEquipmentVerification(equipmentId),
    onSuccess: () => {
      toast.success('Верификация прошла успешно!');
      queryClient.invalidateQueries({ queryKey: ['equipment', 'unverified'] });
    },
    onError: (error) => {
      console.error('Ошибка верификации:', error);
    },
  });
};
