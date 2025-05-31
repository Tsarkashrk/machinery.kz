'use client'

import { AdminSidebar } from '@/4-features/admin-sidebar/ui/AdminSidebar'
import { CreateBrandModal } from '@/4-features/brand/ui/CreateBrand'
import { IBrand, IBrandRequest, useBrands } from '@/5-entities/brand'
import { useCreateBrand } from '@/5-entities/brand/hooks/useCreateBrand'
import { ICON_SIZE } from '@/6-shared/constants/constants'
import Button from '@/6-shared/ui/Buttons/Button'
import { SectionWithContent } from '@/6-shared/ui/SectionWithContent/SectionWithContent'
import { DataTable } from '@/6-shared/ui/Table/Table'
import { Chip } from '@mui/material'
import { TrashIcon, EditIcon, ViewIcon } from 'lucide-react'
import { useState } from 'react'

export const BrandsSection = () => {
  const { brands, isLoading } = useBrands()

  const createBrandMutation = useCreateBrand()

  const [createModal, setCreateModal] = useState({
    isOpen: false,
    item: null,
  })

  const createBrand = () => {
    setCreateModal({
      isOpen: true,
      item: null,
    })
  }

  const handleCreateConfirm = async (data: IBrandRequest) => {
    createBrandMutation.mutate(data)
  }

  const handleCreateClose = () => {
    setCreateModal({ isOpen: false, item: null })
  }

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
      icon: <ViewIcon size={ICON_SIZE} />,
      tooltip: 'Просмотр',
      onClick: (item: IBrand) => console.log('View:', item),
      color: 'info',
    },
    {
      icon: <EditIcon size={ICON_SIZE} />,
      tooltip: 'Редактирование',
      onClick: (item: IBrand) => console.log(item),
      color: 'info',
    },
    {
      icon: <TrashIcon size={ICON_SIZE} />,
      tooltip: 'Удалить',
      onClick: (item: IBrand) => console.log('Delete:', item),
      color: 'error',
    },
  ]

  return (
    <section className="brands-section">
      <div className="brands-section__wrapper">
        <Button onClick={() => createBrand()}>Создать компанию</Button>
        <DataTable data={brands || []} columns={columns} loading={isLoading} actions={actions} onRowClick={(item) => console.log('Row clicked:', item)} />

        <CreateBrandModal isOpen={createModal.isOpen} onClose={handleCreateClose} item={createModal.item} onSave={handleCreateConfirm} isLoading={createBrandMutation.isPending} />
      </div>
    </section>
  )
}
