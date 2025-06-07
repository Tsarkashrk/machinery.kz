import { authApi } from '@/6-shared/api';
import { useQuery } from '@tanstack/react-query';

export const useValidateResetToken = (token: string | null) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['reset-token'],
    queryFn: () => authApi.validateResetToken(token),
    enabled: !!token,
  });

  return { data, isLoading, error };
};
