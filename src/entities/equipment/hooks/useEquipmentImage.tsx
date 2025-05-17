import { equipmentApi, equipmentImagesApi } from '@/shared/api'
import { useQuery } from '@tanstack/react-query'
import { IEquipment } from '../model/equipment.model'

export const useEquipmentImage = (id: number) => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['equipment image'],
    queryFn: () => equipmentImagesApi.getImageById(id),
  })

  return { equipmentImage: data, isLoading, isSuccess }
}

export const useEquipmentWithImages = () => {
  return useQuery<any>({
    queryKey: ['equipment-with-images'],
    queryFn: async () => {
      const equipments = await equipmentApi.getAllEquipment()
      const equipmentsWithImages = await Promise.all(
        equipments.map(async (equipment: IEquipment) => {
          const images = await equipmentImagesApi.getImageById(equipment.id)
          return {
            ...equipment,
            image: images[0]?.image_url || null,
          }
        }),
      )
      return equipmentsWithImages
    },
  })
}
