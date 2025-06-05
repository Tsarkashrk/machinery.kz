"use client";

import {
  IEquipment,
  useEquipmentList,
  useUnverifiedEquipment,
} from "@/5-entities/equipment";
import { useVerifyEquipment } from "@/5-entities/moderator/hooks/useVerifyEquipment";
import { ICON_SIZE } from "@/6-shared/constants/constants";
import { Badge } from "@/6-shared/ui/Badge/Badge";
import { DataTable } from "@/6-shared/ui/Table/Table";
import { Chip } from "@mui/material";
import { ViewIcon, Check, TrashIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export const PublicationsSection = () => {
  const t = useTranslations("DashboardPublicationPage");

  const { data: equipmentList, isLoading } = useEquipmentList();

  const columns: any = [
    {
      key: "id",
      label: "ID",
      width: 80,
      sortable: true,
    },
    {
      key: "name",
      label: "Название",
      sortable: true,
      searchable: true,
    },
    {
      key: "category_details",
      label: "Категория",
      accessor: (item: any) => item.category_details?.name || "-",
      sortable: true,
      searchable: true,
    },
    {
      key: "brand_details",
      label: "Бренд",
      accessor: (item: any) => item.brand_details?.name || "-",
      sortable: true,
      searchable: true,
    },
    {
      key: "model",
      label: "Модель",
      sortable: true,
      searchable: true,
    },
    {
      key: "year",
      label: "Год",
      width: 100,
      sortable: true,
      align: "center",
    },
    {
      key: "condition",
      label: "Состояние",
      render: (value: any) => {
        const conditionMap: { [key: string]: { label: string; color: any } } = {
          new: { label: "Новое", color: "success" },
          used: { label: "Б/У", color: "warning" },
        };
        const condition = conditionMap[value] || {
          label: value,
          color: "default",
        };
        return <Badge type={condition.color}>{condition.label}</Badge>;
      },
      sortable: true,
    },
    {
      key: "purchase_price",
      label: "Цена покупки",
      accessor: (item: any) =>
        item.purchase_price ? `${item.purchase_price} ₸` : "-",
      align: "right",
      sortable: true,
    },
    {
      key: "available_for_rent",
      label: "Аренда",
      width: 100,
      align: "center",
    },
    {
      key: "available_for_sale",
      label: "Продажа",
      width: 100,
      align: "center",
    },
  ];

  const actions: any = [
    {
      icon: <ViewIcon size={ICON_SIZE} />,
      tooltip: "Просмотр",
      onClick: (item: IEquipment) => console.log("View:", item),
      color: "info",
    },
    {
      icon: <TrashIcon size={ICON_SIZE} />,
      tooltip: "Удалить",
      onClick: (item: IEquipment) => console.log("Delete:", item),
      color: "error",
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
          onRowClick={(item) => console.log("Row clicked:", item)}
        />
      </div>
    </section>
  );
};
