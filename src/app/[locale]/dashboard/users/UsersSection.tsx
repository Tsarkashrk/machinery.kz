'use client'

import { DataTable } from '@/6-shared/ui/Table/Table'
import { Trash2Icon, EditIcon, ViewIcon } from 'lucide-react'
import { EnumUserRoles, IUser, IUserRequest } from '@/5-entities/user/'
import { IUserUpdateRole, useDeleteUser, useUsersList } from '@/5-entities/admin'
import { DeleteModal } from '@/6-shared/ui/DeleteModal/DeleteModal'
import { useUpdateUser } from '@/5-entities/admin/hooks/useUpdateUser'
import { useState } from 'react'
import { UpdateUserModal } from '@/4-features/admin'
import { DeleteUserModal } from '@/4-features/admin/ui/DeleteUser'
import { ICON_SIZE } from '@/6-shared/constants/constants'
import { Badge } from '@/6-shared/ui/Badge/Badge'

export const UsersSection = () => {
  const { usersList, isLoading } = useUsersList()
  const updateUserMutation = useUpdateUser()
  const deleteUserMutation = useDeleteUser()

  const [updateModal, setUpdateModal] = useState<{ isOpen: boolean; item: IUser | null }>({ isOpen: false, item: null })

  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; item: IUser | null }>({ isOpen: false, item: null })

  const updateUser = (item: IUser) => {
    setUpdateModal({ isOpen: true, item: item })
  }

  const handleUpdateConfirm = async (data: IUserUpdateRole) => {
    if (updateModal.item) {
      return updateUserMutation.mutate({ id: updateModal.item.id, data: data })
    }
  }

  const handleUpdateClose = () => {
    setUpdateModal({ isOpen: false, item: null })
  }

  const deleteUser = (item: IUser) => {
    setDeleteModal({ isOpen: true, item: item })
  }

  const handleDeleteConfirm = async () => {
    if (deleteModal.item) {
      deleteUserMutation.mutate(deleteModal.item.id, {
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
      key: 'first_name',
      label: 'Имя',
      sortable: true,
      searchable: true,
    },
    {
      key: 'last_name',
      label: 'Фамилия',
      sortable: true,
      searchable: true,
    },
    {
      key: 'username',
      label: 'Имя пользователя',
      sortable: true,
      searchable: true,
    },
    {
      key: 'email',
      label: 'Почта',
      sortable: true,
      searchable: true,
    },
    {
      key: 'phone_number',
      label: 'Номер телефона',
      sortable: true,
      searchable: true,
    },
    {
      key: 'address',
      label: 'Номер телефона',
      sortable: true,
      searchable: true,
    },

    {
      key: 'image_url',
      label: 'Картинка',
      sortable: true,
      searchable: true,
    },
    {
      key: 'date_joined',
      label: 'Дата регистрации',
      sortable: true,
      searchable: true,
    },
    {
      key: 'is_verified',
      label: 'Проверенный',
      sortable: true,
      searchable: true,
    },
    {
      key: 'user_role',
      label: 'Роль',
      render: (value: any) => {
        const roleMap: { [key: string]: { label: string; color: any } } = {
          admin: { label: 'Админ', color: 'error' },
          moderator: { label: 'Модератор', color: 'success' },
          user: { label: 'Пользователь', color: 'warning' },
        }
        const role = roleMap[value] || { label: value, color: 'default' }
        return <Badge type={role.color}>{role.label}</Badge>
      },
      sortable: true,
      searchable: true,
    },
  ]

  const actions: any = [
    {
      icon: <ViewIcon size={ICON_SIZE} />,
      tooltip: 'Просмотр',
      onClick: (item: IUser) => console.log('View:', item),
      color: 'info',
    },
    {
      icon: <EditIcon size={ICON_SIZE} />,
      tooltip: 'Редактирование',
      onClick: (item: IUser) => updateUser(item),
      color: 'info',
    },
    {
      icon: <Trash2Icon size={ICON_SIZE} />,
      tooltip: 'Удалить',
      onClick: (item: IUser) => deleteUser(item),
      color: 'error',
    },
  ]

  return (
    <section className="users-section">
      <div className="users-section__wrapper">
        <DataTable data={usersList || []} columns={columns} loading={isLoading} actions={actions} onRowClick={(item) => console.log('Row clicked:', item)} />

        <DeleteModal isOpen={deleteModal.isOpen} onClose={handleDeleteClose} onConfirm={handleDeleteConfirm} isLoading={deleteUserMutation.isPending} itemName={deleteModal?.item?.username} entityName={'Пользователя'} size="lg" />

        {/* <DeleteUserModal isOpen={deleteModal.isOpen} onClose={handleDeleteClose} user={deleteModal.user} onConfirm={handleDeleteConfirm} isLoading={deleteUserMutation.isPending} /> */}

        <UpdateUserModal isOpen={updateModal.isOpen} onClose={handleUpdateClose} user={updateModal.item} onSave={handleUpdateConfirm} isLoading={updateUserMutation.isPending} />
      </div>
    </section>
  )
}
