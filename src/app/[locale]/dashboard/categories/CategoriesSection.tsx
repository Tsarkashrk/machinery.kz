'use client'

import { AdminSidebar } from '@/4-features/admin-sidebar/ui/AdminSidebar'
import { ICategory, useCategories } from '@/5-entities/category'
import { ICON_SIZE } from '@/6-shared/constants/constants'
import { SectionWithContent } from '@/6-shared/ui/SectionWithContent/SectionWithContent'
import { DataTable } from '@/6-shared/ui/Table/Table'
import { Chip } from '@mui/material'
import {  EditIcon, TrashIcon, ViewIcon } from 'lucide-react'

export const CategoriesSection = () => {
  const { categories, isLoading } = useCategories()

  const editCategory = (item: ICategory) => {}

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
      key: 'image_url',
      label: 'Картинка',
    },
  ]

  const actions: any = [
    {
      icon: <ViewIcon size={ICON_SIZE}/>,
      tooltip: 'Просмотр',
      onClick: (item: ICategory) => console.log('View:', item),
      color: 'info',
    },
    {
      icon: <EditIcon size={ICON_SIZE}/>,
      tooltip: 'Редактирование',
      onClick: (item: ICategory) => editCategory(item),
      color: 'info',
    },
    {
      icon: <TrashIcon size={ICON_SIZE}/>,
      tooltip: 'Удалить',
      onClick: (item: ICategory) => console.log('Delete:', item),
      color: 'error',
    },
  ]

  return (
    <section className="dashboard-section">
      <div className="dashboard-section__wrapper">
        <DataTable data={categories || []} columns={columns} loading={isLoading} actions={actions} onRowClick={(item) => console.log('Row clicked:', item)} />
      </div>
    </section>
  )
}
