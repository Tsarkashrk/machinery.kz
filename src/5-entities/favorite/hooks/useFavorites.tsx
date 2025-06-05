import { favoritesApi } from "@/6-shared/api";
import { useQuery } from "@tanstack/react-query";
import { IFavorite } from "../model/favorite.model";

export const useFavorites = () => {
  const { data, isLoading, isSuccess } = useQuery<any>({
    queryKey: ["favorites"],
    queryFn: () => favoritesApi.getFavorites(),
  });

  return {
    favorites: data || [],
    isLoading,
    isSuccess,
  };
};
