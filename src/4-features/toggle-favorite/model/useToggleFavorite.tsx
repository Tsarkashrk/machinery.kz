import { favoritesApi } from "@/6-shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["favorite"],
    mutationFn: async (productId: number) =>
      favoritesApi.addFavorite(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorite"] });
    },
    onError: (error) => {
      toast.error(
        error.message.includes("401")
          ? "Войди в аккаунт"
          : "Ошибка сервера, попробуйте позже",
      );
    },
  });

  return { mutate, isPending };
};
