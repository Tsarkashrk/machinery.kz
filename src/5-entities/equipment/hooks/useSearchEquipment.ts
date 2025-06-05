import { equipmentApi } from "@/6-shared/api";
import { useQuery } from "@tanstack/react-query";
import { IEquipmentResponse } from "..";

export const useSearchEquipment = (query: string) => {
  const { data, isLoading, isSuccess } = useQuery<IEquipmentResponse>({
    queryKey: ["equipment", query],
    queryFn: () => equipmentApi.searchEquipment(query),
    enabled: !!query,
  });

  return {
    data,
    isLoading,
    isSuccess,
  };
};
