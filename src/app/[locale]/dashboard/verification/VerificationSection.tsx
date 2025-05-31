'use client'

import { IEquipment, useUnverifiedEquipment } from '@/5-entities/equipment'
import { Title } from '@/6-shared/ui/Title/Title'
import { CircularProgress } from '@mui/material'
import { DataTable } from '@/6-shared/ui/Table/Table'
import { Chip } from '@mui/material'
// import { Search as SearchIcon, Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon } from '@mui/icons-material'
import { Check, ViewIcon, EditIcon, SearchIcon, DeleteIcon } from 'lucide-react'
import { useVerifyEquipment } from '@/5-entities/moderator/hooks/useVerifyEquipment'
import { Badge } from '@/6-shared/ui/Badge/Badge'

export const VerificationSection = () => {
  const { data, isLoading } = useUnverifiedEquipment({ page_size: 40 })

  const verifyEquipmentMutation = useVerifyEquipment()

  const confirmEquipment = (id: number) => {
    verifyEquipmentMutation.mutate(id)
  }

  const columns: any = [
    {
      key: 'id',
      label: 'ID',
      width: 80,
      sortable: true,
    },
    {
      key: 'name',
      label: 'Название',
      sortable: true,
      searchable: true,
    },
    {
      key: 'category_details',
      label: 'Категория',
      accessor: (item: any) => item.category_details?.name || '-',
      sortable: true,
      searchable: true,
    },
    {
      key: 'brand_details',
      label: 'Бренд',
      accessor: (item: any) => item.brand_details?.name || '-',
      sortable: true,
      searchable: true,
    },
    {
      key: 'model',
      label: 'Модель',
      sortable: true,
      searchable: true,
    },
    {
      key: 'year',
      label: 'Год',
      width: 100,
      sortable: true,
      align: 'center',
    },
    {
      key: 'condition',
      label: 'Состояние',
      render: (value: any) => {
        const conditionMap: { [key: string]: { label: string; color: any } } = {
          new: { label: 'Новое', color: 'success' },
          used: { label: 'Б/У', color: 'warning' },
        }
        const condition = conditionMap[value] || { label: value, color: 'default' }
        return <Badge type={condition.color}>{condition.label}</Badge>
      },
      sortable: true,
    },
    {
      key: 'purchase_price',
      label: 'Цена покупки',
      accessor: (item: any) => (item.purchase_price ? `${item.purchase_price} ₸` : '-'),
      align: 'right',
      sortable: true,
    },
    {
      key: 'daily_rental_rate',
      label: 'Цена аренды',
      accessor: (item: any) => (item.daily_rental_rate ? `${item.daily_rental_rate} ₸` : '-'),
      align: 'right',
      sortable: true,
    },
    {
      key: 'available_for_rent',
      label: 'Аренда',
      width: 100,
      align: 'center',
    },
    {
      key: 'available_for_sale',
      label: 'Продажа',
      width: 100,
      align: 'center',
    },
  ]

  const actions: any = [
    {
      icon: <ViewIcon />,
      tooltip: 'Просмотр',
      onClick: (item: IEquipment) => console.log('View:', item),
      color: 'info',
    },
    {
      icon: <Check />,
      tooltip: 'Approve',
      onClick: (item: IEquipment) => confirmEquipment(item.id),
      color: 'primary',
    },
    {
      icon: <DeleteIcon />,
      tooltip: 'Удалить',
      onClick: (item: IEquipment) => console.log('Delete:', item),
      color: 'error',
    },
  ]

  return <DataTable data={data?.results || []} columns={columns} loading={isLoading} actions={actions} onRowClick={(item) => console.log('Row clicked:', item)} />
}
