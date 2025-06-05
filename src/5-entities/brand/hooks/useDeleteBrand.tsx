import { brandsApi } from "@/6-shared/api/brands.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => brandsApi.deleteBrand(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      toast.success("Бренд успешно удален!");
    },
    onError: (error) => {
      toast.error(`Ошибка: ${error?.message || error}`);
    },
  });
};
