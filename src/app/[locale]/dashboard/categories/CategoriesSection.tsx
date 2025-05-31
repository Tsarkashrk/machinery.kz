'use client'

import { CategoryDeleteModal } from '@/4-features/category'
import { CategoryEditorModal } from '@/4-features/category/ui/CategoryEditorModal'
import { ICategory, useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '@/5-entities/category'
import { ICON_SIZE } from '@/6-shared/constants/constants'
import Button from '@/6-shared/ui/Buttons/Button'
import { DataTable } from '@/6-shared/ui/Table/Table'
import { EditIcon, TrashIcon, ViewIcon } from 'lucide-react'
import { useState } from 'react'

export const CategoriesSection = () => {
  const { categories, isLoading } = useCategories()

  const createCategoryMutation = useCreateCategory()
  const updateCategoryMutation = useUpdateCategory()
  const deleteCategoryMutation = useDeleteCategory()

  const [createModal, setCreateModal] = useState<{
    isOpen: boolean
    item: ICategory | null
  }>({
    isOpen: false,
    item: null,
  })

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    item: ICategory | null
  }>({
    isOpen: false,
    item: null,
  })

  const [updateModal, setUpdateModal] = useState<{
    isOpen: boolean
    item: ICategory | null
  }>({
    isOpen: false,
    item: null,
  })

  const createCategory = () => {
    setCreateModal({
      isOpen: true,
      item: null,
    })
  }

  const deleteCategory = (item: ICategory) => {
    setDeleteModal({
      isOpen: true,
      item,
    })
  }

  const updateCategory = (item: ICategory) => {
    setUpdateModal({
      isOpen: true,
      item,
    })
  }

  const handleCreateConfirm = async (item: FormData) => {
    createCategoryMutation.mutate(item, {
      onSuccess: () => {
        setCreateModal({ isOpen: false, item: null })
      },
    })
  }

  const handleCreateClose = () => {
    setCreateModal({ isOpen: false, item: null })
  }

  const handleDeleteConfirm = () => {
    if (deleteModal.item) {
      deleteCategoryMutation.mutate(deleteModal.item.id, {
        onSuccess: () => {
          setDeleteModal({ isOpen: false, item: null })
        },
      })
    }
  }

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, item: null })
  }

  const handleUpdateSave = async (data: FormData) => {
    if (updateModal.item) {
      updateCategoryMutation.mutate(
        {
          id: updateModal.item.id,
          data: data,
        },
        {
          onSuccess: () => {
            setUpdateModal({ isOpen: false, item: null })
          },
        },
      )
    }
  }

  const handleUpdateClose = () => {
    setUpdateModal({ isOpen: false, item: null })
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
      key: 'image_url',
      label: 'Картинка',
    },
  ]

  const actions: any = [
    {
      icon: <ViewIcon size={ICON_SIZE} />,
      tooltip: 'Просмотр',
      onClick: (item: ICategory) => console.log('View:', item),
      color: 'info',
    },
    {
      icon: <EditIcon size={ICON_SIZE} />,
      tooltip: 'Редактирование',
      onClick: (item: ICategory) => updateCategory(item),
      color: 'info',
    },
    {
      icon: <TrashIcon size={ICON_SIZE} />,
      tooltip: 'Удалить',
      onClick: (item: ICategory) => deleteCategory(item),
      color: 'error',
    },
  ]

  return (
    <section className="dashboard-section">
      <div className="dashboard-section__wrapper">
        <DataTable data={categories || []} columns={columns} loading={isLoading} actions={actions} onRowClick={(item) => console.log('Row clicked:', item)} buttonOnChange={createCategory} />

        <CategoryEditorModal isOpen={createModal.isOpen} onClose={handleCreateClose} item={createModal.item} onSave={handleCreateConfirm} isLoading={createCategoryMutation.isPending} />

        <CategoryEditorModal isOpen={updateModal.isOpen} onClose={handleUpdateClose} item={updateModal.item} onSave={handleUpdateSave} isLoading={updateCategoryMutation.isPending} />

        <CategoryDeleteModal isOpen={deleteModal.isOpen} onClose={handleDeleteCancel} isLoading={deleteCategoryMutation.isPending} item={deleteModal.item} onConfirm={handleDeleteConfirm} />
      </div>
    </section>
  )
}
