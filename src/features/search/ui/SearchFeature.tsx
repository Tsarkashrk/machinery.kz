'use client'

import { FC, ChangeEvent } from 'react'
import {Input} from '@/shared/ui/Input/Input'
import { Search } from 'lucide-react'
import { IEquipment } from '@/entities/equipment/model/equipment.model'
import { useSearch } from '../model/useSearch'
import { EquipmentList } from '@/widgets/equipment-list'

interface SearchFeatureProps {
  placeholder?: string
}

export const SearchFeature: FC<SearchFeatureProps> = ({ placeholder = 'Search products' }) => {
  const [{ query, searchTerm, results, isLoading }, handleQueryChange] = useSearch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleQueryChange(e.target.value)
  }

  return (
    <div className="search-feature">
      <Input value={query} onChange={handleChange} placeholder={placeholder}>
        <Search size={16} />
      </Input>

      {searchTerm && (
        <div className="search-feature__results">
          {isLoading ? (
            <p className="search-feature__loading">Loading...</p>
          ) : results?.length ? (
            <ul className="search-feature__list">
              <EquipmentList equipmentList={results} isLoading={false} variant="small" />
            </ul>
          ) : (
            <p className="search-feature__empty">No products found</p>
          )}
        </div>
      )}
    </div>
  )
}
