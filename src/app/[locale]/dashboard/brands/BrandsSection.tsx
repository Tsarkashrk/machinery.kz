'use client'

import { AdminSidebar } from '@/4-features/admin-sidebar/ui/AdminSidebar'
import { IBrand, useBrands } from '@/5-entities/brand'
import { SectionWithContent } from '@/6-shared/ui/SectionWithContent/SectionWithContent'
import { DataTable } from '@/6-shared/ui/Table/Table'
import { Chip } from '@mui/material'
import { DeleteIcon, EditIcon, ViewIcon } from 'lucide-react'

export const BrandsSection = () => {
  const { brands, isLoading } = useBrands()

  const editCategory = (item: IBrand) => {}

  const columns: any = [
    {
      key: 'id',
      label: 'ID',
      width: 80,
      sortable: true,
      searchable: true,
    },
    {
      key: 'name',
      label: 'Название',
      sortable: true,
      searchable: true,
    },
    {
      key: 'description',
      label: 'Описание',
      sortable: true,
      searchable: true,
    },
    {
      key: 'founded_year',
      label: 'Год создания',
      sortable: true,
      searchable: true,
    },
    {
      key: 'logo_url',
      label: 'Картинка',
    },
  ]

  const actions: any = [
    {
      icon: <ViewIcon />,
      tooltip: 'Просмотр',
      onClick: (item: IBrand) => console.log('View:', item),
      color: 'info',
    },
    {
      icon: <EditIcon />,
      tooltip: 'Редактирование',
      onClick: (item: IBrand) => editCategory(item),
      color: 'info',
    },
    {
      icon: <DeleteIcon />,
      tooltip: 'Удалить',
      onClick: (item: IBrand) => console.log('Delete:', item),
      color: 'error',
    },
  ]

  return (
    <section className="brands-section">
      <div className="brands-section__wrapper">
        <DataTable data={brands || []} columns={columns} loading={isLoading} title="Оборудование на проверке" actions={actions} onRowClick={(item) => console.log('Row clicked:', item)} />
      </div>
    </section>
  )
}
