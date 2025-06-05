import { useQuery } from "@tanstack/react-query";
import { equipmentApi, equipmentImagesApi } from "@/6-shared/api";
import { IEquipment } from "../model/equipment.model";

export const useEquipmentWithImage = (id: number) => {
  return useQuery({
    queryKey: ["equipment-by-id", id],
    queryFn: async () => {
      const equipment: IEquipment = await equipmentApi.getEquipmentById(id);
      const images = await equipmentImagesApi.getImageById(id);

      return {
        ...equipment,
        // image: images[0]?.image_url || null,
        images,
      };
    },
    enabled: !!id,
  });
};
