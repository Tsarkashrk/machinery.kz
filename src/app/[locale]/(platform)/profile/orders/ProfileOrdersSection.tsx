'use client';

import { TransactionsList } from '@/3-widgets/transactions-list';
import { useMyTransactions } from '@/5-entities/rental';
import { useProfile } from '@/5-entities/user';
import Button from '@/6-shared/ui/Buttons/Button';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const ProfileOrdersSection = () => {
  const { profile } = useProfile();
  const [activeTab, setActiveTab] = useState<'listings' | 'deals'>('listings');

  const { data: allTransactions, isLoading } = useMyTransactions();

  const myListingsTransactions = allTransactions?.filter(
    (t: any) => t.equipment_details.owner === profile?.id,
  );

  const myDealsTransactions = allTransactions?.filter(
    (t: any) => t.equipment_details.owner !== profile?.id,
  );

  const selectedTransactions =
    activeTab === 'listings' ? myListingsTransactions : myDealsTransactions;

  const queryClient = useQueryClient();

  const invalidateTransactions = () => {
    queryClient.invalidateQueries({ queryKey: ['my-transactions'] });
  };

  return (
    <section className="profile-deals">
      <div className="profile-deals__wrapper">
        <div className="profile-deals__tabs">
          <Button
            variant={activeTab === 'listings' ? 'secondary' : 'outlined'}
            onClick={() => setActiveTab('listings')}
          >
            Полученные заявки
          </Button>
          <Button
            variant={activeTab === 'deals' ? 'secondary' : 'outlined'}
            onClick={() => setActiveTab('deals')}
          >
            Отправленные заявки
          </Button>
        </div>

        {isLoading ? (
          <p>Загрузка...</p>
        ) : selectedTransactions?.length === 0 ? (
          <p>Нет транзакций</p>
        ) : (
          <TransactionsList
            equipmentList={selectedTransactions}
            tab={activeTab}
            onTransactionUpdate={invalidateTransactions} 
          />
        )}
      </div>
    </section>
  );
};
