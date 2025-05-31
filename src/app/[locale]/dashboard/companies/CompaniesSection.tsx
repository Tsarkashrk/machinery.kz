'use client'

import { useState } from 'react'
import { DataTable } from '@/6-shared/ui/Table/Table'
import { Trash2Icon, EditIcon, ViewIcon } from 'lucide-react'
import { ICompanyEditRequest, ICompanyPostRequest, ICompanyResponse, useCompaniesList } from '@/5-entities/company'
import { EditCompanyModal } from '@/4-features/company/ui/EditCompany'
import { DeleteCompanyModal } from '@/4-features/company/ui/DeleteCompany'
import Button from '@/6-shared/ui/Buttons/Button'
import { CreateCompanyModal } from '@/4-features/company'
import { useCreateCompany, useDeleteCompany, useUpdateCompany } from '@/5-entities/company'
import { ICON_SIZE } from '@/6-shared/constants/constants'

export const CompaniesSection = () => {
  const { companiesList, isLoading } = useCompaniesList()
  const createCompanyMutation = useCreateCompany()
  const deleteCompanyMutation = useDeleteCompany()
  const updateCompanyMutation = useUpdateCompany()

  const [createModal, setCreateModal] = useState<{
    isOpen: boolean
    company: ICompanyPostRequest | null
  }>({
    isOpen: false,
    company: null,
  })
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    company: ICompanyResponse | null
  }>({
    isOpen: false,
    company: null,
  })

  const [editModal, setEditModal] = useState<{
    isOpen: boolean
    company: ICompanyResponse | null
  }>({
    isOpen: false,
    company: null,
  })

  const createCompany = () => {
    setCreateModal({
      isOpen: true,
      company: null,
    })
  }

  const deleteCompany = (company: ICompanyResponse) => {
    setDeleteModal({
      isOpen: true,
      company,
    })
  }

  const editCompany = (item: ICompanyResponse) => {
    setEditModal({
      isOpen: true,
      company: item,
    })
  }

  const handleCreateConfirm = async (data: ICompanyPostRequest) => {
    createCompanyMutation.mutate(data)
  }

  const handleCreateClose = () => {
    setCreateModal({ isOpen: false, company: null })
  }

  const handleDeleteConfirm = () => {
    if (deleteModal.company) {
      deleteCompanyMutation.mutate(deleteModal.company.id, {
        onSuccess: () => {
          setDeleteModal({ isOpen: false, company: null })
        },
        onError: (error) => {
          console.error('Delete failed:', error)
        },
      })
    }
  }

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, company: null })
  }

  const handleEditSave = async (data: any) => {
    if (editModal.company) {
      return updateCompanyMutation.mutate({
        id: editModal.company.id,
        data: data,
      })
    }
  }

  const handleEditClose = () => {
    setEditModal({ isOpen: false, company: null })
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
      key: 'company_name',
      label: 'Название',
      sortable: true,
      searchable: true,
    },
    {
      key: 'company_address',
      label: 'Адрес',
      sortable: true,
      searchable: true,
    },
    {
      key: 'company_phone',
      label: 'Номер',
      sortable: true,
      searchable: true,
    },
    {
      key: 'company_email',
      label: 'Почта',
      sortable: true,
      searchable: true,
    },
    {
      key: 'file',
      label: 'Картинка',
      sortable: true,
      searchable: true,
    },
    {
      key: 'website',
      label: 'Вебсайт',
      sortable: true,
      searchable: true,
    },
    {
      key: 'founded_year',
      label: 'Дата создания',
      sortable: true,
      searchable: true,
    },
  ]

  const actions: any = [
    {
      icon: <ViewIcon size={ICON_SIZE}/>,
      tooltip: 'Просмотр',
      onClick: (item: ICompanyResponse) => console.log('View:', item),
      color: 'info',
    },
    {
      icon: <EditIcon size={ICON_SIZE}/>,
      tooltip: 'Редактирование',
      onClick: (item: ICompanyResponse) => editCompany(item),
      color: 'info',
    },
    {
      icon: <Trash2Icon size={ICON_SIZE}/>,
      tooltip: 'Удалить',
      onClick: (item: ICompanyResponse) => deleteCompany(item),
      color: 'error',
    },
  ]

  return (
    <section className="companies-section">
      <div className="companies-section__wrapper">
        <Button onClick={() => createCompany()}>Создать компанию</Button>
        <DataTable data={companiesList?.results} columns={columns} loading={isLoading} actions={actions} onRowClick={(item) => console.log('Row clicked:', item)} />

        <DeleteCompanyModal isOpen={deleteModal.isOpen} onClose={handleDeleteCancel} company={deleteModal.company} onConfirm={handleDeleteConfirm} isLoading={deleteCompanyMutation.isPending} />

        <EditCompanyModal isOpen={editModal.isOpen} onClose={handleEditClose} company={editModal.company} onSave={handleEditSave} isLoading={updateCompanyMutation.isPending} />

        <CreateCompanyModal isOpen={createModal.isOpen} onClose={handleCreateClose} company={createModal.company} onSave={handleCreateConfirm} isLoading={createCompanyMutation.isPending} />
      </div>
    </section>
  )
}
