import { categoriesApi } from "@/6-shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => categoriesApi.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Категория успешно удалена!");
    },
    onError: (error) => {
      toast.error(`Ошибка: ${error?.message || error}`);
    },
  });
};
