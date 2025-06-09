import { usersApi } from '@/6-shared/api';
import { useQuery } from '@tanstack/react-query';

export const useUserById = (id: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [`user-${id}`],
    queryFn: () => usersApi.getUserById(id),
  });

  return { user: data, isLoading, error };
};
