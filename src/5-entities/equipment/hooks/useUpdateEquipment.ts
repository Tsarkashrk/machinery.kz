import { equipmentApi } from "@/6-shared/api";
import { useMutation } from "@tanstack/react-query";
import { IEquipmentRequest } from "../model/equipment.model";

type Props = {
  id: number;
  data: IEquipmentRequest;
};

export const useUpdateEquipment = () => {
  const {} = useMutation({
    mutationFn: ({ id, data }: Props) => equipmentApi.updateEquipment(id, data),
  });
};
