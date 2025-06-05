"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useBrands } from "@/5-entities/brand";
import { useCategories } from "@/5-entities/category";
import { IEquipmentFilters, IFilterFormData } from "../model/filter.model";
import {
  convertFormDataToFilters,
  getInitialFormData,
} from "../lib/filter.utils";
import Label from "@/6-shared/ui/Label/Label";
import { Input } from "@/6-shared/ui/Input/Input";
import Button from "@/6-shared/ui/Buttons/Button";
import Card from "@/6-shared/ui/Cards/Card/Card";
import Dropdown from "@/6-shared/ui/Dropdown/Dropdown";
import { Description } from "@/6-shared/ui/Description/Description";

interface IEquipmentFilterProps {
  onFiltersChange: (filters: IEquipmentFilters) => void;
  initialFilters?: IEquipmentFilters;
  className?: string;
}

export const EquipmentFilter: React.FC<IEquipmentFilterProps> = ({
  onFiltersChange,
  initialFilters = {},
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAllFilters, setShowAllFilters] = useState(false);

  const { brands, isLoading: brandsLoading } = useBrands();
  const { categories, isLoading: categoriesLoading } = useCategories({
    ordering: "name",
  });

  const defaultValues = getInitialFormData();
  const { register, handleSubmit, reset, watch, control } =
    useForm<IFilterFormData>({
      defaultValues,
    });

  const handleApplyFilters = handleSubmit((data) => {
    onFiltersChange(convertFormDataToFilters(data));
    setIsOpen(false);
  });

  const handleResetFilters = () => {
    reset(defaultValues);
    onFiltersChange({
      ...convertFormDataToFilters(defaultValues),
      category: initialFilters.category,
    });
  };

  const formData = watch();

  const filterFields = [
    {
      label: "Поиск",
      element: (
        <Input placeholder="Поиск по названию..." {...register("search")} />
      ),
    },
    {
      label: "Категория",
      element: (
        <Dropdown
          control={control}
          name={"category"}
          options={
            categories?.map((c) => ({ ...c, title: c.name, value: c.id })) || []
          }
        />
      ),
    },
    {
      label: "Бренд",
      element: (
        <Dropdown
          control={control}
          name={"brand"}
          options={
            brands?.map((b) => ({ ...b, title: b.name, value: b.id })) || []
          }
        />
      ),
    },

    {
      label: "Цена от",
      element: (
        <Input type="number" placeholder="0" {...register("min_price")} />
      ),
    },
    {
      label: "Аренда в день от",
      element: (
        <Input type="number" placeholder="0" {...register("min_rental_rate")} />
      ),
    },
    {
      label: "Год от",
      element: (
        <Input type="number" placeholder="1900" {...register("min_year")} />
      ),
    },
    {
      label: "Цена до",
      element: (
        <Input type="number" placeholder="∞" {...register("max_price")} />
      ),
    },
    {
      label: "Аренда в день до",
      element: (
        <Input type="number" placeholder="∞" {...register("max_rental_rate")} />
      ),
    },
    {
      label: "Год до",
      element: (
        <Input
          type="number"
          placeholder={new Date().getFullYear().toString()}
          {...register("max_year")}
        />
      ),
    },
    {
      label: "Доступно для аренды",
      element: (
        <div style={{ display: "flex", gap: "1rem" }}>
          <input type="checkbox" {...register("available_for_rent")} />{" "}
          <Description>Доступно для аренды</Description>
        </div>
      ),
    },
    {
      label: "Доступно для продажи",
      element: (
        <div style={{ display: "flex", gap: "1rem" }}>
          <input type="checkbox" {...register("available_for_sale")} />
          <Description>Доступно для продажи</Description>
        </div>
      ),
    },
  ];

  return (
    <div className={`equipment-filter ${className}`}>
      <div className="equipment-filter__wrapper">
        <form className="equipment-filter__panel" onSubmit={handleApplyFilters}>
          <div className="equipment-filter__grid">
            {(showAllFilters ? filterFields : filterFields.slice(0, 3)).map(
              (field, index) => (
                <div className="equipment-filter__field" key={index}>
                  <Label>{field.label}</Label>
                  {field.element}
                </div>
              ),
            )}
          </div>

          {/* <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Button type="button" onClick={() => setShowAllFilters((prev) => !prev)} variant="outlined">
              {showAllFilters ? 'Скрыть дополнительные фильтры ↑' : 'Показать больше фильтров ↓'}
            </Button>
          </div> */}

          <div className="equipment-filter__actions">
            <Button
              type="button"
              onClick={() => setShowAllFilters((prev) => !prev)}
              variant="outlined"
            >
              {showAllFilters
                ? "Скрыть дополнительные фильтры ↑"
                : "Показать больше фильтров ↓"}
            </Button>
            <Button variant="outlined" onClick={handleResetFilters}>
              Сбросить
            </Button>
            <Button variant="secondary">Применить</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
