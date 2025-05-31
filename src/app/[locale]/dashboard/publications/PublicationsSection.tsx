'use client'

import { IEquipment, useEquipmentList, useUnverifiedEquipment } from '@/5-entities/equipment'
import { useVerifyEquipment } from '@/5-entities/moderator/hooks/useVerifyEquipment'
import { DataTable } from '@/6-shared/ui/Table/Table'
import { Chip } from '@mui/material'
import { ViewIcon, Check, TrashIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

export const PublicationsSection = () => {
  const t = useTranslations('DashboardPublicationPage')

  const { data: equipmentList, isLoading } = useEquipmentList()

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
          good: { label: 'Хорошее', color: 'info' },
          fair: { label: 'Удовлетворительное', color: 'warning' },
          poor: { label: 'Плохое', color: 'error' },
        }
        const condition = conditionMap[value] || { label: value, color: 'default' }
        return (
          <>
            <Chip label={condition.label} color={condition.color} size="small" />
          </>
        )
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
      icon: <TrashIcon />,
      tooltip: 'Удалить',
      onClick: (item: IEquipment) => console.log('Delete:', item),
      color: 'error',
    },
  ]

  return (
    <section className="dashboard-publication-section">
      <div className="dashboard-publication-section__wrapper">
        <DataTable data={equipmentList?.results || []} columns={columns} loading={isLoading} title="Оборудование на проверке" actions={actions} onRowClick={(item) => console.log('Row clicked:', item)} />
      </div>
    </section>
  )
}
