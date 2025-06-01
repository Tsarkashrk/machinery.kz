'use client'

import { CreateBrandModal } from '@/4-features/brand/ui/CreateBrand'
import { IBrand, IBrandRequest, useBrands } from '@/5-entities/brand'
import { useCreateBrand, useDeleteBrand } from '@/5-entities/brand/'
import { ICON_SIZE } from '@/6-shared/constants/constants'
import Button from '@/6-shared/ui/Buttons/Button'
import { DeleteModal } from '@/6-shared/ui/DeleteModal/DeleteModal'
import { DataTable } from '@/6-shared/ui/Table/Table'
import { TrashIcon, EditIcon, ViewIcon } from 'lucide-react'
import { useState } from 'react'

export const BrandsSection = () => {
  const { brands, isLoading } = useBrands()

  const createBrandMutation = useCreateBrand()
  const deleteBrandMutation = useDeleteBrand()

  const [createModal, setCreateModal] = useState<{ isOpen: boolean; item: IBrand | null }>({
    isOpen: false,
    item: null,
  })
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; item: IBrand | null }>({ isOpen: false, item: null })

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

  const deleteBrand = (item: IBrand) => {
    setDeleteModal({ isOpen: true, item: item })
  }

  const handleDeleteConfirm = async () => {
    if (deleteModal.item) {
      deleteBrandMutation.mutate(deleteModal.item.id, {
        onSuccess: () => {
          handleDeleteClose()
        },
      })
    }
  }

  const handleDeleteClose = () => {
    setDeleteModal({ isOpen: false, item: null })
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
      key: 'file',
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
      onClick: (item: IBrand) => deleteBrand(item),
      color: 'error',
    },
  ]

  return (
    <section className="brands-section">
      <div className="brands-section__wrapper">
        <DataTable data={brands || []} columns={columns} loading={isLoading} actions={actions} onRowClick={(item) => console.log('Row clicked:', item)} buttonOnChange={createBrand} />

        <CreateBrandModal isOpen={createModal.isOpen} onClose={handleCreateClose} item={createModal.item} onSave={handleCreateConfirm} isLoading={createBrandMutation.isPending} />

        <DeleteModal isOpen={deleteModal.isOpen} onClose={handleDeleteClose} onConfirm={handleDeleteConfirm} isLoading={deleteBrandMutation.isPending} itemName={deleteModal?.item?.name} entityName={'Пользователя'} size="lg" />
      </div>
    </section>
  )
}
