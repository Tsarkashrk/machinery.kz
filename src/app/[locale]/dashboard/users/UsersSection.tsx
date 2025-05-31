'use client'

import { DataTable } from '@/6-shared/ui/Table/Table'
import { Trash2Icon, EditIcon, ViewIcon } from 'lucide-react'
import { IUser } from '@/5-entities/user/'
import { useUsersList } from '@/5-entities/admin'

export const UsersSection = () => {
  const { usersList, isLoading } = useUsersList()

  const editUser = (item: IUser) => {}

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
      sortable: true,
      searchable: true,
    },
  ]

  const actions: any = [
    {
      icon: <ViewIcon />,
      tooltip: 'Просмотр',
      onClick: (item: IUser) => console.log('View:', item),
      color: 'info',
    },
    {
      icon: <EditIcon />,
      tooltip: 'Редактирование',
      onClick: (item: IUser) => editUser(item),
      color: 'info',
    },
    {
      icon: <Trash2Icon />,
      tooltip: 'Удалить',
      onClick: (item: IUser) => console.log('Delete:', item),
      color: 'error',
    },
  ]

  return (
    <section className="users-section">
      <div className="users-section__wrapper">
        <DataTable data={usersList || []} columns={columns} loading={isLoading} title="Оборудование на проверке" actions={actions} onRowClick={(item) => console.log('Row clicked:', item)} />
      </div>
    </section>
  )
}
