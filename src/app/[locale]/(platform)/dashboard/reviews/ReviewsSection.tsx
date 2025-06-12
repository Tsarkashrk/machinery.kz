// 'use client';

// import { useReviewList } from '@/5-entities/review/hooks/useReviewList';
// import { ICON_SIZE } from '@/6-shared/constants/constants';
// import { DataTable } from '@/6-shared/ui/Table/Table';
// import { PreviewModal } from '@/6-shared/ui/PreviewModal/PreviewModal';
// import { ViewIcon } from 'lucide-react';
// import { useTranslations } from 'next-intl';
// import { useState } from 'react';

// export const ReviewsSection = () => {
//   const t = useTranslations('DashboardReviewPage');

//   const { reviews, isLoading } = useReviewList();

//   const [previewModal, setPreviewModal] = useState<{
//     isOpen: boolean;
//     item: any | null;
//   }>({
//     isOpen: false,
//     item: null,
//   });

//   const handlePreviewClose = () => {
//     setPreviewModal({ isOpen: false, item: null });
//   };

//   const viewReview = (item: any) => {
//     setPreviewModal({
//       isOpen: true,
//       item,
//     });
//   };

//   const columns = [
//     {
//       key: 'id',
//       label: 'ID',
//       width: 60,
//       sortable: true,
//     },
//     {
//       key: 'transaction_details.equipment_details.name',
//       label: 'Оборудование',
//       accessor: (item: any) =>
//         item.transaction_details?.equipment_details?.name || '-',
//       sortable: true,
//       searchable: true,
//     },
//     {
//       key: 'transaction_details.buyer_details.username',
//       label: 'Покупатель',
//       accessor: (item: any) =>
//         item.transaction_details?.buyer_details?.username || '-',
//       sortable: true,
//     },
//     {
//       key: 'transaction_details.seller_details.username',
//       label: 'Продавец',
//       accessor: (item: any) =>
//         item.transaction_details?.seller_details?.username || '-',
//       sortable: true,
//     },
//     {
//       key: 'rating',
//       label: 'Оценка',
//       align: 'center',
//       sortable: true,
//     },
//     {
//       key: 'comment',
//       label: 'Комментарий',
//       width: 300,
//       accessor: (item: any) =>
//         item.comment?.length > 50
//           ? item.comment.slice(0, 50) + '…'
//           : item.comment || '-',
//     },
//   ];

//   const actions = [
//     {
//       icon: <ViewIcon size={ICON_SIZE} />,
//       tooltip: 'Просмотр',
//       onClick: (item: any) => viewReview(item),
//       color: 'info',
//     },
//   ];

//   const previewFields = [
//     {
//       name: 'id',
//       label: 'ID',
//       type: 'text',
//     },
//     {
//       name: 'transaction_details.equipment_details.name',
//       label: 'Оборудование',
//       type: 'text',
//       render: (item: any) =>
//         item?.transaction_details?.equipment_details?.name || '-',
//     },
//     {
//       name: 'transaction_details.buyer_details.username',
//       label: 'Покупатель',
//       type: 'text',
//       render: (item: any) =>
//         item?.transaction_details?.buyer_details?.username || '-',
//     },
//     {
//       name: 'transaction_details.seller_details.username',
//       label: 'Продавец',
//       type: 'text',
//       render: (item: any) =>
//         item?.transaction_details?.seller_details?.username || '-',
//     },
//     {
//       key: 'rating',
//       label: 'Оценка',
//       align: 'center',
//       sortable: true,
//     },
//     {
//       name: 'comment',
//       label: 'Комментарий',
//       type: 'textarea',
//     },
//   ];

//   return (
//     <section className="dashboard-review-section">
//       <div className="dashboard-review-section__wrapper">
//         <DataTable
//           data={reviews?.results || []}
//           columns={columns}
//           loading={isLoading}
//           actions={actions}
//           onRowClick={(item) => console.log('Row clicked:', item)}
//         />

//         <PreviewModal
//           isOpen={previewModal.isOpen}
//           onClose={handlePreviewClose}
//           title="отзыв"
//           item={previewModal.item}
//           fields={previewFields}
//         />
//       </div>
//     </section>
//   );
// };
