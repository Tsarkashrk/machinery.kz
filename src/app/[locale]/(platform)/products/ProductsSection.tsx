'use client';

import { EquipmentList } from '@/3-widgets/equipment-list';
import { EquipmentFilter } from '@/4-features/filter';
import { useEquipmentList } from '@/5-entities/equipment';
import { SectionWithContent } from '@/6-shared/ui/SectionWithContent/SectionWithContent';
import { Title } from '@/6-shared/ui/Title/Title';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useState, useCallback, useEffect } from 'react';
import type { IEquipmentFilters } from '@/4-features/filter';
import { EmptyCard } from '@/6-shared/ui/EmptyCard/EmptyCard';
import Pagination from '@/6-shared/ui/Pagination/Pagination';

const PAGE_SIZE = 20;

const ProductSection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryId = Number(searchParams.get('category')) || undefined;

  const initialPage = Number(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const [filters, setFilters] = useState<IEquipmentFilters>({
    page: initialPage,
    page_size: PAGE_SIZE,
    category: categoryId,
  });

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: categoryId,
      page: currentPage,
    }));
  }, [categoryId, currentPage]);

  const { data: equipmentList, isLoading } = useEquipmentList(filters);

  const handleFiltersChange = useCallback(
    (newFilters: IEquipmentFilters) => {
      setCurrentPage(1); 

      const params = new URLSearchParams(searchParams.toString());

      if (newFilters.category) {
        params.set('category', String(newFilters.category));
      } else {
        params.delete('category');
      }

      params.set('page', '1');

      setFilters({
        ...newFilters,
        page: 1,
        page_size: PAGE_SIZE,
      });

      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`?${params.toString()}`);

    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  const totalPages = equipmentList ? Math.ceil(equipmentList.count / PAGE_SIZE) : 0;

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
              equipmentList={equipmentList.results}
              isLoading={isLoading}
            />
          )}

          {equipmentList && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </SectionWithContent>
      </div>
    </section>
  );
};

export default ProductSection;
