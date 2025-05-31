import { equipmentApi, equipmentImagesApi } from '@/6-shared/api'
import { useQuery } from '@tanstack/react-query'
import { IEquipment } from '../model/equipment.model'

export const useEquipmentImage = (id: number) => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['equipment image'],
    queryFn: () => equipmentImagesApi.getImageById(id),
  })

  return { equipmentImage: data, isLoading, isSuccess }
}

type Props = {
  brand?: number
  available_for_rent?: boolean
  available_for_sale?: boolean
  category?: number
  max_price?: number
  max_rental_rate?: number
  max_year?: number
  min_price?: number
  min_rental_rate?: number
  min_year?: number
  ordering?: string
  page?: number
  page_size?: number
  search?: string
  year?: number
}

export const useEquipmentWithImages = (params?: Props) => {
  return useQuery({
    queryKey: ['equipment-with-images', params],
    queryFn: async () => {
      const { results } = await equipmentApi.getAllEquipment(params)
      const equipmentsWithImages = await Promise.all(
        results.map(async (equipment: IEquipment) => {
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
