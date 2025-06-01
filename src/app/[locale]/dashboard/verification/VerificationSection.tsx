'use client'

import { IEquipment, useUnverifiedEquipment } from '@/5-entities/equipment'
import { DataTable } from '@/6-shared/ui/Table/Table'
import { Check, ViewIcon, TrashIcon } from 'lucide-react'
import { useVerifyEquipment } from '@/5-entities/moderator/hooks/useVerifyEquipment'
import { Badge } from '@/6-shared/ui/Badge/Badge'
import { ICON_SIZE } from '@/6-shared/constants/constants'
import { DASHBOARD_PAGES } from '@/6-shared/config/pages-url.config'
import { useRouter } from 'next/navigation'

export const VerificationSection = () => {
  const router = useRouter()

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
      icon: <ViewIcon size={ICON_SIZE} />,
      tooltip: 'Просмотр',
      onClick: (item: IEquipment) => router.push(`${DASHBOARD_PAGES.VERIFICATION}/${item.id}`),
      color: 'info',
    },
    {
      icon: <Check size={ICON_SIZE} />,
      tooltip: 'Approve',
      onClick: (item: IEquipment) => confirmEquipment(item.id),
      color: 'primary',
    },
    {
      icon: <TrashIcon size={ICON_SIZE} />,
      tooltip: 'Удалить',
      onClick: (item: IEquipment) => console.log('Delete:', item),
      color: 'error',
    },
  ]

  return <DataTable data={data?.results || []} columns={columns} loading={isLoading} actions={actions} onRowClick={(item) => console.log('Row clicked:', item)} />
}
