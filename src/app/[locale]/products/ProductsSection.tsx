"use client";

import { EquipmentList } from "@/3-widgets/equipment-list";
import { EquipmentFilter } from "@/4-features/filter";
import { useEquipmentList } from "@/5-entities/equipment";
import { SectionWithContent } from "@/6-shared/ui/SectionWithContent/SectionWithContent";
import { Title } from "@/6-shared/ui/Title/Title";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useCallback, useEffect } from "react";
import type { IEquipmentFilters } from "@/4-features/filter";
import { EmptyCard } from "@/6-shared/ui/EmptyCard/EmptyCard";

const ProductSection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryId = Number(searchParams.get("category")) || undefined;

  const baseFilters = {
    page: 1,
    page_size: 20,
    category: categoryId,
  };

  const [filters, setFilters] = useState<IEquipmentFilters>(baseFilters);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: categoryId,
    }));
  }, [categoryId]);

  const { data: equipmentList, isLoading } = useEquipmentList(filters);

  const handleFiltersChange = useCallback(
    (newFilters: IEquipmentFilters) => {
      setFilters(newFilters);

      // обновляем URL с новым category
      const params = new URLSearchParams(searchParams.toString());

      if (newFilters.category) {
        params.set("category", String(newFilters.category));
      } else {
        params.delete("category");
      }

      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  return (
    <section className="products-section">
      <div className="products-section__wrapper">
        <SectionWithContent>
          <Title>Объявления</Title>

          <EquipmentFilter
            onFiltersChange={handleFiltersChange}
            initialFilters={filters}
            className="mb-6"
          />

          {!equipmentList || equipmentList.count === 0 ? (
            <EmptyCard>По вашему поиску объявлений не найдено</EmptyCard>
          ) : (
            <EquipmentList
              equipmentList={equipmentList?.results}
              isLoading={isLoading}
            />
          )}
        </SectionWithContent>
      </div>
    </section>
  );
};

export default ProductSection;
