'use client'

import { FC, ChangeEvent } from 'react'
import { Input } from '@/6-shared/ui/Input/Input'
import { Search } from 'lucide-react'
import { useSearch } from '../model/useSearch'
import { EquipmentList } from '@/3-widgets/equipment-list'
import { ICON_SIZE } from '@/6-shared/constants/constants'

type Props = {
  placeholder?: string
}

export const SearchFeature = ({ placeholder = 'Search products' }: Props) => {
  const [{ query, searchTerm, results, isLoading }, handleQueryChange] = useSearch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleQueryChange(e.target.value)
  }

  console.log(results)

  return (
    <div className="search-feature">
      <Input value={query} onChange={handleChange} placeholder={placeholder}>
        <Search size={ICON_SIZE} />
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
