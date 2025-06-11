'use client';

import Card from '@/6-shared/ui/Cards/Card/Card';
import Button from '@/6-shared/ui/Buttons/Button';
import DatePicker from '@/6-shared/ui/DatePicker/DatePicker';
import TextMuted from '@/6-shared/ui/TextMuted/TextMuted';
import {
  PLATFORM_PAGES,
  PROFILE_PAGES,
} from '@/6-shared/config/pages-url.config';
import { useProfile, useUserById } from '@/5-entities/user';
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
import { GoogleMaps } from '@/6-shared/ui/GoogleMaps/GoogleMaps';
import { ProfileCardSmall } from '@/6-shared/ui/ProfileCardSmall/ProfileCardSmall';
import { useRequestPurchase } from '@/5-entities/purchase/hooks/useRequestPurchase';

export const ProductIdSection = () => {
  const { id } = useParams();

  const { equipmentData } = useEquipmentById(Number(id));
  const categoryId = equipmentData?.category_details?.id;

  const ownerId = equipmentData?.owner;
  const { user: ownerData } = useUserById(ownerId ?? 0);

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
  const { mutate: requestPurchaseTransaction } = useRequestPurchase();

  const handlePurchaseAction = (e: any) => {
    e.preventDefault();

    if (!equipmentData) {
      return;
    }

    if (!profile) {
      toast.error('Войдите в аккаунт!');
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
        onError: (error) => {
          console.log(error);
          if (
            error.response.data.non_field_errors[0] ===
            'The fields dealer, buyer, equipment must make a unique set.'
          ) {
          }
        },
      },
    );

    requestPurchaseTransaction({
      equipment: equipmentData.id,
      amount: equipmentData.purchase_price,
      purchase_terms:
        'Действуют стандартные условия покупки. Возврат товара производится путем договора сторон.',
    });
  };

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
        onError: (error) => {
          console.log(error);
          if (
            error.response.data.non_field_errors[0] ===
            'The fields dealer, buyer, equipment must make a unique set.'
          ) {
          }
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
            <div className="product-slug__section-map">
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
                        fontSize="14px"
                      >
                        {equipmentData?.description}
                      </TitleDescription>
                    </div>
                    <div className="product-slug__tab">
                      <Title size="h2">Спецификации</Title>
                      <TitleDescription
                        color="gray"
                        fontSize="14px"
                      >
                        <div className="product-slug__specifications">
                          <ul>
                            <li>
                              <strong
                                style={{
                                  overflow: 'hidden',
                                  maxWidth: '10rem',
                                  width: '100%',
                                }}
                              >
                                Производитель
                              </strong>
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
                    {equipmentData?.available_for_rent && (
                      <div className="product-slug__tab">
                        <Title size="h2">Условия аренды</Title>
                        <TitleDescription
                          color="gray"
                          fontSize="14px"
                        >
                          Действуют стандартные условия аренды. Оборудование
                          должно быть возвращено в прежнем состоянии
                        </TitleDescription>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
              <div className="product-slug__map">
                <GoogleMaps
                  address={`${equipmentData?.location_city}, ${equipmentData?.location_address}`}
                />
              </div>
            </div>
            <div className="product-slug__block">
              <h1 className="product-slug__price">
                {equipmentData?.available_for_rent ? (
                  <div className="product-slug__price-block">
                    <div className="product-slug__price-rate">
                      {equipmentData?.daily_rental_rate} ₸{' '}
                      <TextMuted
                        fontSize="16px"
                        fontWeight="600"
                      >
                        {' '}
                        / день
                      </TextMuted>
                    </div>
                  </div>
                ) : (
                  <div className="product-slug__price-block">
                    <div className="product-slug__price-rate">
                      {equipmentData?.purchase_price} ₸
                    </div>
                  </div>
                )}
              </h1>
              <div className="product-slug__buttons">
                {equipmentData?.available_for_rent && (
                  <form>
                    <DatePicker onSelectDates={setSelectedDates} />
                    <div className="product-slug__button">
                      <div className="product-slug__total">
                        <h1>Итоговая цена</h1>
                        <div className="product-slug__line" />
                        <h2>{total} ₸</h2>
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
                        onClick={(e) => {
                          e.preventDefault();
                          setShowNumber(!showNumber);
                        }}
                        width="100%"
                      >
                        {showNumber
                          ? ownerData?.phone_number
                          : 'Показать номер'}
                      </Button>
                    </div>
                  </form>
                )}
                {equipmentData?.available_for_sale && (
                  <>
                    <ProfileCardSmall
                      equipmentCount={0}
                      dealsCount={Number(ownerData?.total_transactions)}
                      location={ownerData?.address}
                      trustScore={ownerData?.trust_score}
                      firstName={ownerData?.first_name}
                      lastName={ownerData?.last_name}
                      avatar={ownerData?.image_url}
                      link={`${PLATFORM_PAGES.DEALERS}/${ownerData?.id}`}
                    />
                    <Button
                      onClick={(e) => handlePurchaseAction(e)}
                      width="100%"
                    >
                      Написать владельцу
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowNumber(!showNumber);
                      }}
                      width="100%"
                    >
                      {showNumber ? ownerData?.phone_number : 'Показать номер'}
                    </Button>
                  </>
                )}
                <Button
                  variant="outlined"
                  link={`${PLATFORM_PAGES.DEALERS}/${ownerData?.id}`}
                  width="100%"
                >
                  Перейти в профиль
                </Button>
              </div>
            </div>
          </div>

          {isSuccess && equipmentList?.results && equipmentData?.id && (
            <>
              <Title>Похожие объявления</Title>
              <EquipmentList
                equipmentList={equipmentList.results.filter(
                  (item) => item.id !== equipmentData.id,
                )}
              />
            </>
          )}
        </SectionWithContent>
      </div>
    </section>
  );
};
