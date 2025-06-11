'use client';

import { useCreateChat } from '@/5-entities/chat';
import Button from '@/6-shared/ui/Buttons/Button';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useProfile } from '@/5-entities/user';
import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config';
import { ProfileCard } from '@/3-widgets/profile-card';
import { EquipmentList } from '@/3-widgets/equipment-list';
import { useEquipmentList } from '@/5-entities/equipment';
import Card from '@/6-shared/ui/Cards/Card/Card';
import { Title } from '@/6-shared/ui/Title/Title';
import { useDealerById } from '@/5-entities/dealer/hooks/useDealerById';
import { SectionWithContent } from '@/6-shared/ui/SectionWithContent/SectionWithContent';
import Pagination from '@/6-shared/ui/Pagination/Pagination';
import { useState, useEffect } from 'react';

const PAGE_SIZE = 20;

export const DealerSlug = () => {
  const { profile } = useProfile();
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const slug = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const ownerId = Number(slug);
  const buyerId = profile?.id;

  const initialPage = Number(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const { data: equipmentList, isLoading } = useEquipmentList({
    owner: ownerId,
    page: currentPage,
    page_size: PAGE_SIZE,
  });

  const { user } = useDealerById(ownerId);

  const totalPages = equipmentList
    ? Math.ceil(equipmentList.count / PAGE_SIZE)
    : 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`?${params.toString()}`);
  };

  const handleCreateChat = () => {
    // Пример логики создания чата — можешь раскомментировать и доработать
    // if (buyerId && ownerId) {
    //   mutate({
    //     dealer: ownerId,
    //     buyer: buyerId,
    //     deal_item: someEquipmentId,
    //   }, {
    //     onSuccess: () => {
    //       router.push(PLATFORM_PAGES.MESSAGES);
    //     },
    //   });
    // }
  };

  return (
    <section className="dealer-section">
      <div className="dealer-section__wrapper">
        <SectionWithContent>
          {user && equipmentList && (
            <Card>
              <ProfileCard
                user={{
                  id: user.id,
                  name: `${user.first_name} ${user.last_name}` || user.username,
                  title: user.user_role,
                  location: user.address,
                  avatar: user.image_url || '',
                  isPro: false,
                  stats: {
                    equipment: equipmentList.count,
                    deals: Number(user.total_transactions),
                    rating: user.trust_score,
                  },
                }}
              />
            </Card>
          )}

          <Title size="h1">Список оборудования</Title>

          {equipmentList && (
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
