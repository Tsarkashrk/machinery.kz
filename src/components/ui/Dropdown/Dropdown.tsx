'use client'

import React, { useState, useRef, useEffect } from 'react'

interface CatalogItem {
  id: number
  title: string
}

interface DropDownProps {
  options: CatalogItem[]
  placeholder?: string
  onSelect?: (item: CatalogItem) => void
}

const DropDown: React.FC<DropDownProps> = ({ options, placeholder = 'Select an option', onSelect }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<CatalogItem | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleSelect = (item: CatalogItem) => {
    setSelected(item)
    setIsOpen(false)
    onSelect?.(item)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className={`dropdown ${isOpen ? 'dropdown--open' : ''}`} ref={dropdownRef}>
      <button className="dropdown__toggle" onClick={() => setIsOpen(!isOpen)}>
        {selected ? selected.title : placeholder}
        <span className="dropdown__arrow">{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <ul className="dropdown__menu">
          {options.map((item) => (
            <li key={item.id} className="dropdown__item" onClick={() => handleSelect(item)}>
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DropDown
