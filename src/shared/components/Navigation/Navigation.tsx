import { Users, ShoppingBag, BadgeCheck, Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PLATFORM_PAGES } from '@/shared/config/pages-url.config'
import { ICON_SIZE } from '@/shared/constants/constants'
import { useTranslations } from 'next-intl'
import { Input } from '@/shared/ui/Input/Input'
import { useSearchEquipment } from '@/entities/equipment/hooks/useSearchEquipment'
import { useState } from 'react'
import debounce from 'lodash.debounce'
import { SearchModal } from '@/widgets/search-modal'
import Button from '@/shared/ui/Buttons/Button'

const Navigation = () => {
  const path = usePathname()
  const t = useTranslations('Navigation')

  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const { data, isLoading, isSuccess } = useSearchEquipment(debouncedSearch)

  const debounced = debounce((val: string) => {
    setDebouncedSearch(val)
  }, 400)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    debounced(e.target.value)
  }

  const navItems = [
    { link: PLATFORM_PAGES.CATEGORIES, title: t('categories-title'), icon: <ShoppingBag size={ICON_SIZE} /> },
    { link: PLATFORM_PAGES.BRANDS, title: t('brands-title'), icon: <BadgeCheck size={ICON_SIZE} /> },
    { link: PLATFORM_PAGES.DEALERS, title: t('dealers-title'), icon: <Users size={ICON_SIZE} /> },
  ]

  return (
    <nav className="navigation">
      <ul className="navigation__list">
        {navItems.map((item) => (
          <li key={item.link} className="navigation__item">
            <Link href={item.link} className={`navigation__link ${path === item.link && 'navigation__link--active'}`}>
              {item.icon} {item.title}
            </Link>
          </li>
        ))}
      </ul>

      {/* <div className="navigation__search">
        <Input placeholder="Search" id="search" value={search} onChange={handleChange}>
          <Search size={ICON_SIZE} />
        </Input>

        {debouncedSearch && isSuccess && (
          <ul className="navigation__search-results">
            {data &&
              data.map((item) => (
                <li key={item.id} className="navigation__search-item">
                  <Link href={`${PLATFORM_PAGES.PRODUCT}/${item.id}`}>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
          </ul>
        )}
      </div> */}

      <div className="navigation__search">
        <Button variant="outlined" onClick={() => setIsSearchOpen(true)}>
          {t('search-title')}
          <Search size={ICON_SIZE} />
        </Button>
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  )
}

export default Navigation
