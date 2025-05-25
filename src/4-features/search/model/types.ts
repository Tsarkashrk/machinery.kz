import { IEquipment } from '@/5-entities/equipment/model/equipment.model'

export interface SearchState {
  query: string
  searchTerm: string
  results: IEquipment[] | null
  isLoading: boolean
}
