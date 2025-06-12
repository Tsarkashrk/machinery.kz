'use client';

import {
  IEquipment,
  useEquipmentList,
  useUnverifiedEquipment,
} from '@/5-entities/equipment';
import { useDeleteEquipment } from '@/5-entities/equipment/hooks/useDeleteEquipment';
import { useVerifyEquipment } from '@/5-entities/moderator/hooks/useVerifyEquipment';
import { ICON_SIZE } from '@/6-shared/constants/constants';
import { Badge } from '@/6-shared/ui/Badge/Badge';
import { DeleteModal } from '@/6-shared/ui/DeleteModal/DeleteModal';
import { PreviewModal } from '@/6-shared/ui/PreviewModal/PreviewModal';
import { DataTable } from '@/6-shared/ui/Table/Table';
import { Chip } from '@mui/material';
import { ViewIcon, Check, TrashIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export const PublicationsSection = () => {
  const t = useTranslations('DashboardPublicationPage');

  const { data: equipmentList, isLoading } = useEquipmentList();

  const [previewModal, setPreviewModal] = useState<{
    isOpen: boolean;
    item: IEquipment | null;
  }>({
    isOpen: false,
    item: null,
  });

  const viewEquipment = (item: IEquipment) => {
    setPreviewModal({
      isOpen: true,
      item,
    });
  };

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    item: IEquipment | null;
  }>({ isOpen: false, item: null });

  const handlePreviewClose = () => {
    setPreviewModal({ isOpen: false, item: null });
  };

  const deleteEquipmentMutation = useDeleteEquipment();

  const deleteEquipment = (item: IEquipment) => {
    setDeleteModal({ isOpen: true, item: item });
  };

  const handleDeleteConfirm = async () => {
    if (deleteModal.item) {
      deleteEquipmentMutation.mutate(deleteModal.item.id, {
        onSuccess: () => {
          handleDeleteClose();
        },
      });
    }
  };

  const handleDeleteClose = () => {
    setDeleteModal({ isOpen: false, item: null });
  };

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
          new: { label: 'Новое', color: 'green' },
          used: { label: 'Б/У', color: 'orange' },
        };
        const condition = conditionMap[value] || {
          label: value,
          color: 'default',
        };
        return <Badge type={condition.color}>{condition.label}</Badge>;
      },
      sortable: true,
    },
    {
      key: 'purchase_price',
      label: 'Цена покупки',
      accessor: (item: any) =>
        item.purchase_price ? `${item.purchase_price} ₸` : '-',
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
  ];

  const previewFields = [
    {
      name: 'images',
      label: 'Изображение',
      type: 'images' as const,
    },
    {
      name: 'id',
      label: 'ID',
      type: 'text' as const,
    },
    {
      name: 'name',
      label: 'Название',
      type: 'text' as const,
    },
    {
      name: 'description',
      label: 'Описание',
      type: 'textarea' as const,
    },
    {
      name: 'category_details.name',
      label: 'Категория',
      type: 'text' as const,
      render: (item: IEquipment) => item?.category_details?.name || '-',
    },
    {
      name: 'brand_details',
      label: 'Бренд',
      type: 'text' as const,
      render: (item: IEquipment) => item?.brand_details?.name || '-',
    },
    {
      name: 'model',
      label: 'Модель',
      type: 'text' as const,
    },
    {
      name: 'year',
      label: 'Год',
      type: 'text' as const,
    },
    {
      name: 'condition',
      label: 'Состояние',
      type: 'text' as const,
      render: (item: IEquipment) => {
        if (!item?.condition) return '-';
        const conditionMap: { [key: string]: string } = {
          new: 'Новое',
          used: 'Б/У',
        };
        return conditionMap[item.condition] || item.condition;
      },
    },
    {
      name: 'purchase_price',
      label: 'Цена покупки',
      type: 'text' as const,
    },
    {
      name: 'daily_rental_rate',
      label: 'Цена аренды',
      type: 'text' as const,
    },
    {
      name: 'available_for_rent',
      label: 'Доступно для аренды',
      type: 'text' as const,
      render: (item: IEquipment) => (item?.available_for_rent ? 'Да' : 'Нет'),
    },
    {
      name: 'available_for_sale',
      label: 'Доступно для продажи',
      type: 'text' as const,
      render: (item: IEquipment) => (item?.available_for_sale ? 'Да' : 'Нет'),
    },
    {
      name: 'created_at',
      label: 'Дата создания',
      type: 'text' as const,
      render: (item: IEquipment) => {
        if (!item?.created_at) return '-';
        return new Date(item.created_at).toLocaleDateString('ru-RU', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      },
    },
  ];

  const actions: any = [
    {
      icon: <ViewIcon size={ICON_SIZE} />,
      tooltip: 'Просмотр',
      onClick: (item: IEquipment) => viewEquipment(item),
      color: 'info',
    },
    {
      icon: <TrashIcon size={ICON_SIZE} />,
      tooltip: 'Удалить',
      onClick: (item: IEquipment) => deleteEquipment(item),
      color: 'error',
    },
  ];

  return (
    <section className="dashboard-publication-section">
      <div className="dashboard-publication-section__wrapper">
        <DataTable
          data={equipmentList?.results || []}
          columns={columns}
          loading={isLoading}
          actions={actions}
          onRowClick={(item) => console.log('Row clicked:', item)}
        />

        <PreviewModal
          isOpen={previewModal.isOpen}
          onClose={handlePreviewClose}
          title="оборудования"
          item={previewModal.item}
          fields={previewFields}
        />

        <DeleteModal
          isOpen={deleteModal.isOpen}
          onClose={handleDeleteClose}
          onConfirm={handleDeleteConfirm}
          isLoading={deleteEquipmentMutation.isPending}
          itemName={deleteModal?.item?.name}
          entityName={'публикацию'}
          size="lg"
        />
      </div>
    </section>
  );
};
