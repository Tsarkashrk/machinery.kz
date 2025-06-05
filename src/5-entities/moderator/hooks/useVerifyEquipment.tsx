import { moderatorApi } from "@/6-shared/api/moderator.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useVerifyEquipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (equipmentId: number) =>
      moderatorApi.confirmEquipmentVerification(equipmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipment", "unverified"] });
      console.log("Equipment verified successfully!");
    },
    onError: (error) => {
      console.error("Failed to verify equipment:", error);
    },
  });
};
