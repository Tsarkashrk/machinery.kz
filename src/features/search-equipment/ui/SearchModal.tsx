'use client'

import { useState, useEffect, useCallback } from 'react'
import debounce from 'lodash.debounce'
import { useSearchEquipment } from '../model/useSearchEquipment'
import { IEquipment } from '@/entities/equipment'
import Input from '@/shared/ui/Input/Input'
import { Search } from 'lucide-react'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value)
    }, 500),
    [],
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    debouncedSearch(e.target.value)
  }

  const { data, isLoading } = useSearchEquipment(searchTerm)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <Input value={query} onChange={handleChange} placeholder="Search products">
          <Search size={16} />
        </Input>

        {searchTerm && (
          <div className="search-modal__results">
            {isLoading ? (
              <p>Loading...</p>
            ) : data?.length ? (
              <ul>
                {data.map((item: IEquipment) => (
                  <li key={item.id} className="search-modal__item">
                    <span>{item.name}</span>
                    <span>{item.daily_rental_rate}₽</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No products found</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
