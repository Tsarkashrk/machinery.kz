'use client';

import { TransactionsList } from '@/3-widgets/transactions-list';
import { useGetPurchaseList } from '@/5-entities/purchase';
import { useMyTransactions } from '@/5-entities/rental';
import { useProfile } from '@/5-entities/user';
import Button from '@/6-shared/ui/Buttons/Button';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const ProfileOrdersSection = () => {
  const { profile } = useProfile();
  const [activeTab, setActiveTab] = useState<'listings' | 'deals'>('listings');

  const { data: allTransactions, isLoading: isLoadingRental } = useMyTransactions();
  const { purchaseList, isLoading: isLoadingPurchase } = useGetPurchaseList();

  const isLoading = isLoadingRental || isLoadingPurchase;

  const myRentalListings = allTransactions?.filter(
    (t: any) => t.equipment_details?.owner === profile?.id,
  ) || [];

  const myRentalDeals = allTransactions?.filter(
    (t: any) => t.equipment_details?.owner !== profile?.id,
  ) || [];

  const myPurchaseListings = purchaseList?.filter(
    (t: any) => t.seller_details?.id === profile?.id,
  ) || [];

  const myPurchaseDeals = purchaseList?.filter(
    (t: any) => t.buyer_details?.id === profile?.id,
  ) || [];

  const selectedTransactions = activeTab === 'listings'
    ? [...myRentalListings, ...myPurchaseListings]
    : [...myRentalDeals, ...myPurchaseDeals];

  const queryClient = useQueryClient();

  const invalidateTransactions = () => {
    queryClient.invalidateQueries({ queryKey: ['my-transactions'] });
    queryClient.invalidateQueries({ queryKey: ['purchase-list'] });
  };

  return (
    <section className="profile-deals">
      <div className="profile-deals__wrapper">
        <div className="profile-deals__tabs">
          <Button
            variant={activeTab === 'listings' ? 'secondary' : 'outlined'}
            onClick={() => setActiveTab('listings')}
          >
            Полученные заявки ({myRentalListings.length + myPurchaseListings.length})
          </Button>
          <Button
            variant={activeTab === 'deals' ? 'secondary' : 'outlined'}
            onClick={() => setActiveTab('deals')}
          >
            Отправленные заявки ({myRentalDeals.length + myPurchaseDeals.length})
          </Button>
        </div>

        {isLoading ? (
          <p>Загрузка...</p>
        ) : selectedTransactions.length === 0 ? (
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