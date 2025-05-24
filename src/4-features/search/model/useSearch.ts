import { useState, useEffect, useCallback } from 'react'
import debounce from 'lodash.debounce'
import { useSearchEquipment } from '@/5-entities/equipment/hooks/useSearchEquipment'
import { SearchState } from './types'

const DEBOUNCE_DELAY = 500

export const useSearch = (): [SearchState, (value: string) => void] => {
  const [query, setQuery] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const debouncedSearch = debounce((value: string) => {
      setSearchTerm(value)
    }, DEBOUNCE_DELAY)

    if (query !== searchTerm) {
      debouncedSearch(query)
    }

    return () => {
      debouncedSearch.cancel()
    }
  }, [query, searchTerm])

  const { data, isLoading } = useSearchEquipment(searchTerm)

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value)
  }, [])

  return [
    {
      query,
      searchTerm,
      results: data?.results || null,
      isLoading,
    },
    handleQueryChange,
  ]
}
