import { moderatorApi } from '@/6-shared/api/moderator.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useRejectEquipment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (equipmentId: number) => moderatorApi.rejectEquipmentVerification(equipmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipment', 'unverified'] })
      toast.success('Equipment rejected successfully!')
    },
    onError: (error) => {
      toast.error(`Failed to verify equipment: ${error}`)
    },
  })
}
