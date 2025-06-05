import { authApi } from "@/6-shared/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const usePasswordReset = () => {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (email: string) => authApi.resetPassword(email),
  });

  return { mutate, isPending, isSuccess };
};
