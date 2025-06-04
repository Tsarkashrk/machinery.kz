export interface IEquipmentFilters {
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
  owner?: number
}

export interface IFilterFormData {
  search: string
  brand: string
  category: number | null
  available_for_rent: boolean
  available_for_sale: boolean
  min_price: string
  max_price: string
  min_rental_rate: string
  max_rental_rate: string
  min_year: string
  max_year: string
  condition: string
  location_city: string
}
