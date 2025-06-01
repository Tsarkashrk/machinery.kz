'use client'

import { CategoryDeleteModal } from '@/4-features/category'
import { CategoryEditorModal } from '@/4-features/category/ui/CategoryEditorModal'
import { ICategory, useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '@/5-entities/category'
import { ICON_SIZE } from '@/6-shared/constants/constants'
import Button from '@/6-shared/ui/Buttons/Button'
import { DeleteModal } from '@/6-shared/ui/DeleteModal/DeleteModal'
import { EditorModal } from '@/6-shared/ui/EditorModal/EditorModal'
import { DataTable } from '@/6-shared/ui/Table/Table'
import { Edit2, Edit3, EditIcon, TrashIcon, ViewIcon } from 'lucide-react'
import { useState } from 'react'

// Define the form type for category editing
interface CategoryFormData {
  id?: number
  name: string
  description: string
  parent_category: number | null
  file: File | null
}

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

  const handleDeleteClose = () => {
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
      icon: <Edit2 size={ICON_SIZE} color="#363435" />,
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

  const fields = [
    {
      name: 'name',
      label: 'Название категории',
      type: 'text' as const,
      required: true,
      placeholder: 'Введите название',
    },
    {
      name: 'description',
      label: 'Описание',
      type: 'text' as const,
    },
    {
      name: 'file',
      label: 'Изображение',
      type: 'file' as const,
    },
  ]

  return (
    <section className="dashboard-section">
      <div className="dashboard-section__wrapper">
        <DataTable data={categories || []} columns={columns} loading={isLoading} actions={actions} onRowClick={(item) => console.log('Row clicked:', item)} buttonOnChange={createCategory} />

        {/* <CategoryEditorModal isOpen={createModal.isOpen} onClose={handleCreateClose} item={createModal.item} onSave={handleCreateConfirm} isLoading={createCategoryMutation.isPending} /> */}

        <EditorModal
          isOpen={createModal.isOpen}
          onClose={handleCreateClose}
          onSave={handleCreateConfirm}
          isLoading={createCategoryMutation.isPending}
          item={
            updateModal.item
              ? {
                  id: updateModal.item.id,
                  name: updateModal.item.name || '',
                  description: updateModal.item.description || '',
                  parent_category: updateModal.item.parent_category || null,
                  file: null,
                }
              : null
          }
          title="Категорию"
          defaultValues={{
            id: updateModal?.item?.id || 0,
            name: '',
            description: '',
            parent_category: null,
            file: null,
          }}
          fields={fields}
        />

        <EditorModal
          isOpen={updateModal.isOpen}
          onClose={handleUpdateClose}
          onSave={handleUpdateSave}
          isLoading={updateCategoryMutation.isPending}
          item={
            updateModal.item
              ? {
                  id: updateModal.item.id,
                  name: updateModal.item.name || '',
                  description: updateModal.item.description || '',
                  parent_category: updateModal.item.parent_category || null,
                  file: null,
                }
              : null
          }
          title="Категорию"
          defaultValues={{
            id: updateModal?.item?.id || 0,
            name: '',
            description: '',
            parent_category: null,
            file: null,
          }}
          fields={fields}
        />

        <DeleteModal isOpen={deleteModal.isOpen} onClose={handleDeleteClose} onConfirm={handleDeleteConfirm} isLoading={deleteCategoryMutation.isPending} itemName={deleteModal?.item?.name} entityName={'Категорию'} size="lg" />
      </div>
    </section>
  )
}
