'use client';

import Card from '@/6-shared/ui/Cards/Card/Card';
import Button from '@/6-shared/ui/Buttons/Button';
import DatePicker from '@/6-shared/ui/DatePicker/DatePicker';
import TextMuted from '@/6-shared/ui/TextMuted/TextMuted';
import {
  PLATFORM_PAGES,
  PROFILE_PAGES,
} from '@/6-shared/config/pages-url.config';
import { useProfile } from '@/5-entities/user';
import { rentApi, equipmentApi } from '@/6-shared/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useEquipmentById } from '@/5-entities/equipment/hooks/useEquipmentById';
import { useCreateChat } from '@/5-entities/chat';
import { SectionWithContent } from '@/6-shared/ui/SectionWithContent/SectionWithContent';
import { useCategoryById } from '@/5-entities/category';
import { useEquipmentList } from '@/5-entities/equipment';
import { EquipmentList } from '@/3-widgets/equipment-list';
import { Title } from '@/6-shared/ui/Title/Title';
import { TitleDescription } from '@/6-shared/ui/TitleDescription/TitleDescription';
import { useCreateRental, useRequestRental } from '@/5-entities/rental';

export const ProductIdSection = () => {
  const { id } = useParams();
  const user: any = useProfile();

  const { equipmentData } = useEquipmentById(Number(id));
  const categoryId = equipmentData?.category_details?.id;

  const {
    data: equipmentList,
    isLoading,
    isSuccess,
  } = useEquipmentList({ category: categoryId || undefined });

  useEffect(() => {
    if (equipmentData?.images?.[0]?.image_url) {
      setSelectedImage(equipmentData.images[0].image_url);
    }
  }, [equipmentData]);
  const [selectedTab, setSelectedTab] = useState('description');
  const [selectedDates, setSelectedDates] = useState<
    [Date | null, Date | null]
  >([null, null]);
  const [total, setTotal] = useState<any>('');
  const [showNumber, setShowNumber] = useState(false);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm({
    mode: 'onChange',
  });

  const { push } = useRouter();

  const { mutate } = useMutation({
    mutationKey: ['rent'],
    mutationFn: (data: any) => rentApi.rentEquipment(data),
    onSuccess() {
      toast.success('The lease has started successfully!');
      reset();
      push(PROFILE_PAGES.PROFILE);
    },
    onError(error) {
      toast.error(`${error}`, { description: 'Try again!' });
    },
  });

  const calculateTotalAmount = (
    selectedDates: [Date | null, Date | null],
    dailyRate: number,
  ) => {
    if (!selectedDates[0] || !selectedDates[1]) return 0;

    const startDate = new Date(selectedDates[0]);
    const endDate = new Date(selectedDates[1]);

    const days =
      Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      ) + 1;
    return days * dailyRate;
  };

  useEffect(() => {
    if (equipmentData?.daily_rental_rate) {
      const totalAmount = calculateTotalAmount(
        selectedDates,
        Number(equipmentData.daily_rental_rate),
      );
      setTotal(totalAmount);
    }
  }, [selectedDates, equipmentData?.daily_rental_rate]);

  const formatDateToAPI = (date: Date | null) => {
    return date ? date.toISOString() : null;
  };

  // const onSubmit: SubmitHandler<any> = (data: any) => {
  //   if (!selectedDates[0] || !selectedDates[1]) {
  //     toast.error('Выберите даты аренды!');
  //     return;
  //   }

  //   console.log(data);

  //   const totalAmount = calculateTotalAmount(
  //     selectedDates,
  //     Number(equipmentData?.daily_rental_rate),
  //   );

  //   setTotal(totalAmount);

  //   mutate({
  //     rental_terms: 'sadfsdf',
  //     equipment: id,
  //     renter: user?.data?.id,
  //     start_date: formatDateToAPI(selectedDates[0]),
  //     end_date: formatDateToAPI(selectedDates[1]),
  //     total_amount: totalAmount,
  //     status: 'pending',
  //     ...data,
  //   });
  // };

  const params = useParams();
  const slug = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const router = useRouter();
  const { profile } = useProfile();

  const { mutate: createChatMutation } = useCreateChat();
  const { mutate: requestRentalTransaction } = useRequestRental();

  const handleAction = (e: any) => {
    e.preventDefault();

    if (!equipmentData) {
      return;
    }

    if (!profile) {
      toast.error('Войдите в аккаунт!');
      return;
    }

    if (!selectedDates || !selectedDates[0] || !selectedDates[1]) {
      toast.warning('Выберите даты аренды');
      return;
    }

    createChatMutation(
      {
        dealer: equipmentData.owner,
        buyer: profile.id,
        equipment: equipmentData.id,
      },
      {
        onSuccess: () => {
          router.push(`${PLATFORM_PAGES.MESSAGES}`);
        },
      },
    );

    requestRentalTransaction({
      equipment: equipmentData.id,
      renter: profile.id,
      start_date: selectedDates[0],
      end_date: selectedDates[1],
      pickup_confirmed_by_owner: false,
      pickup_confirmed_by_renter: false,
      rental_terms:
        'Действуют стандартные условия аренды. Оборудование должно быть возвращено в прежнем состоянии',
      return_confirmed_by_owner: false,
      return_confirmed_by_renter: false,
      security_deposit_amount: '',
      status: 'requested',
      total_amount: total,
    });
  };

  return (
    <section className="product-slug">
      <div className="product-slug__wrapper">
        <SectionWithContent>
          <div className="product-slug__cards">
            <Card>
              <div className="product-slug__title">
                <Title size="h2">{equipmentData?.name}</Title>
              </div>
              <div className="product-slug__info">
                <img
                  className="product-slug__img"
                  src={selectedImage || `/assets/profile-placeholder.png`}
                  alt=""
                />
                <div className="product-slug__images">
                  {equipmentData?.images.map((image) => (
                    <img
                      key={image.id}
                      className="product-slug__img--small"
                      src={image.image_url}
                      alt=""
                      onClick={() => setSelectedImage(image.image_url)}
                    />
                  ))}
                </div>
                <div className="product-slug__titles">
                  <div className="product-slug__tab">
                    <Title size="h2">Описание</Title>
                    <TitleDescription
                      color="gray"
                      fontSize="16px"
                    >
                      {equipmentData?.description}
                    </TitleDescription>
                  </div>
                  <div className="product-slug__tab">
                    <Title size="h2">Спецификации</Title>
                    <TitleDescription
                      color="gray"
                      fontSize="16px"
                    >
                      <div className="product-slug__specifications">
                        <ul>
                          <li>
                            <strong>Производитель </strong>
                          </li>
                          <li>
                            <strong>Модель </strong>
                          </li>
                          <li>
                            <strong>Год </strong>
                          </li>
                          <li>
                            <strong>Состояние </strong>
                          </li>
                          <li>
                            <strong>Категория </strong>
                          </li>
                        </ul>
                        <ul>
                          <li>{equipmentData?.brand_details.name}</li>
                          <li>{equipmentData?.model}</li>
                          <li>{equipmentData?.year}</li>
                          <li>
                            {equipmentData?.condition === 'new'
                              ? 'Новое'
                              : 'Б/У'}
                          </li>
                          <li>{equipmentData?.category_details?.name}</li>
                        </ul>
                      </div>
                    </TitleDescription>
                  </div>
                  <div className="product-slug__tab">
                    <Title size="h2">Условия аренды</Title>
                    <TitleDescription
                      color="gray"
                      fontSize="16px"
                    >
                      Действуют стандартные условия аренды. Оборудование должно
                      быть возвращено в прежнем состоянии
                    </TitleDescription>
                  </div>
                </div>
              </div>

              <div className="product-slug__tab-content"></div>
            </Card>
            <div className="product-slug__block">
              <h1 className="product-slug__price">
                {equipmentData?.available_for_rent ? (
                  <div className="product-slug__price-block">
                    <div className="product-slug__price-rate">
                      {equipmentData?.daily_rental_rate} KZT
                    </div>
                    <TextMuted>в день</TextMuted>
                  </div>
                ) : (
                  <div className="product-slug__price-block">
                    <div className="product-slug__price-rate">
                      {equipmentData?.purchase_price} KZT
                    </div>
                  </div>
                )}
              </h1>
              {equipmentData?.available_for_rent && (
                <form>
                  <DatePicker onSelectDates={setSelectedDates} />
                  <div className="product-slug__button">
                    <div className="product-slug__total">
                      <h1>Итоговая цена</h1>
                      <div className="product-slug__line" />
                      <h2>{total} KZT</h2>
                    </div>
                    <div className="product-slug__button-list"></div>
                  </div>
                  <div className="product-slug__buttons">
                    <Button
                      onClick={(e) => handleAction(e)}
                      width="100%"
                    >
                      Написать владельцу
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setShowNumber(!showNumber)}
                      width="100%"
                    >
                      {showNumber ? '87477810777' : 'Показать номер'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <Title>Похожие объявления</Title>

          {equipmentList && (
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
