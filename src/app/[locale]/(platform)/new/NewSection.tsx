'use client';

import Card from '@/6-shared/ui/Cards/Card/Card';
import Button from '@/6-shared/ui/Buttons/Button';
import { Input } from '@/6-shared/ui/Input/Input';
import Label from '@/6-shared/ui/Label/Label';
import TextMuted from '@/6-shared/ui/TextMuted/TextMuted';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config';
import Dropdown from '@/6-shared/ui/Dropdown/Dropdown';
import InputFile from '@/6-shared/ui/Input/InputFile';
import { equipmentApi, equipmentImagesApi } from '@/6-shared/api';
import { useCategories } from '@/5-entities/category/hooks/useCategories';
import { useProfile } from '@/5-entities/user';
import { useBrands } from '@/5-entities/brand';
import { useTranslations } from 'next-intl';
import Textarea from '@/6-shared/ui/Textarea/Textarea';
import ErrorMessage from '@/6-shared/ui/ErrorMessage/ErrorMessage';
import GoogleAutocompleteInput from '@/6-shared/ui/GoogleAutoComplete/GoogleAutoComplete';

const NewSection = () => {
  const { brands } = useBrands();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm({
    mode: 'onChange',
  });

  const t = useTranslations();

  const listingType = watch('type');

  const { categories } = useCategories('equipment', { ordering: 'name' });

  const { profile, isSuccess } = useProfile();

  const { push } = useRouter();

  const [isImageUploading, setIsImageUploading] = useState(false);

  const equipmentMutation = useMutation({
    mutationKey: ['equipment'],
    mutationFn: (data: any) => equipmentApi.createEquipment(data),
    onError() {
      toast.error('Failed to create equipment', { description: 'Try again!' });
    },
  });

  const imageMutation = useMutation({
    mutationKey: ['equipment-image'],
    mutationFn: (formData: FormData) =>
      equipmentImagesApi.uploadImage(formData),
    onError() {
      toast.error('Failed to upload image');
    },
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    const formattedData = {
      owner: profile?.id,
      brand: data.manufacturer,
      ...data,
      purchase_price: data.purchase_price | 0,
      daily_rental_rate: data.daily_rental_rate | 0,
      available_for_rent: data.type === 'rent',
      available_for_sale: data.type === 'sell',
    };

    try {
      const createdEquipment =
        await equipmentMutation.mutateAsync(formattedData);

      if (data.file && data.file.length > 0) {
        const uploadPromises = Array.from(data.file).map((file: any) => {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('equipment', createdEquipment.id.toString());
          return imageMutation.mutateAsync(formData);
        });

        await Promise.all(uploadPromises);
      } else {
        toast.success('Публикация успешно отправлена на проверку');
      }

      reset();
      push(PLATFORM_PAGES.HOME);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const isLoading = equipmentMutation.isPending || imageMutation.isPending;

  const listingTypes = [
    {
      id: 1,
      title: t('to-sell'),
      value: 'sell',
    },
    {
      id: 2,
      title: t('to-rent-out'),
      value: 'rent',
    },
  ];
  const conditions = [
    {
      id: 1,
      title: t('new'),
      value: 'new',
    },
    {
      id: 2,
      title: t('used'),
      value: 'used',
    },
  ];

  return (
    <section className="new-section">
      <div className="new-section__wrapper">
        <div className="new-section__cards">
          <Card>
            <div className="new-section__header">
              <div className="new-section__header-text">
                <h1 className="new-section__title">
                  {t('create-new-listing')}
                </h1>
                <TextMuted>{t('fill-details-listing')}</TextMuted>
              </div>
              {/* <div className="new-section__header-buttons">
                <Button text="Previous" variant="outlined" icon={<ChevronLeft size={ICON_SIZE} />} />
                <Button text="Next" icon={<ChevronRight size={ICON_SIZE} />} />
              </div> */}
            </div>
          </Card>

          {/* <Card>
            <h1 className="new-section__title">{t('upload-images')}</h1>
            <hr />
            <InputFile {...register('file')} onChange={(e) => console.log(e.target.value)} />
          </Card> */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="new-section__form"
          >
            <Card>
              <h1 className="new-section__title">{t('upload-images')}</h1>
              <hr />
              <InputFile {...register('file')} />

              <h1 className="new-section__title">
                {t('equipment-information')}
              </h1>
              <hr />
              <div className="new-section__info">
                <div className="new-section__info-blocks">
                  <div className="new-section__info-block">
                    <Label forElement="type">{t('listing-type')}</Label>
                    <Dropdown
                      name="type"
                      control={control}
                      options={listingTypes}
                      rules={{ required: t('listing-type-required') }}
                    />
                  </div>
                  <div className="new-section__info-block">
                    <Label forElement="category">{t('category')}</Label>
                    <Dropdown
                      name="category"
                      control={control}
                      options={
                        categories?.map((category) => ({
                          ...category,
                          title: category.name,
                          value: category.id,
                        })) || []
                      }
                      rules={{ required: t('category-required') }}
                    />
                  </div>
                </div>
                <div className="new-section__info-blocks">
                  <div className="new-section__info-block">
                    <Label forElement="name">{t('name')}</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder={t('equipment-title-placeholder')}
                      {...register('name', {
                        required: t('name-required'),
                      })}
                    />
                    {typeof errors.name?.message === 'string' && (
                      <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                  </div>
                  <div className="new-section__info-block">
                    <Label forElement="model">{t('model')}</Label>
                    <Input
                      id="model"
                      type="text"
                      placeholder="GSR 12V-30"
                      {...register('model', { required: t('model-required') })}
                    />
                    {typeof errors.model?.message === 'string' && (
                      <ErrorMessage>{errors.model.message}</ErrorMessage>
                    )}
                  </div>
                </div>
                <div className="new-section__info-blocks">
                  <div className="new-section__info-block">
                    <Label forElement="manufacturer">{t('manufacturer')}</Label>
                    <Dropdown
                      name="manufacturer"
                      control={control}
                      options={
                        brands?.map((brand) => ({
                          ...brand,
                          title: brand.name,
                          value: brand.id,
                        })) || []
                      }
                      rules={{ required: t('manufacturer-required') }}
                    />
                  </div>
                  <div className="new-section__info-block">
                    <Label forElement="year">{t('year')}</Label>
                    <Input
                      id="year"
                      type="number"
                      placeholder="2010-2025"
                      {...register('year', {
                        required: t('year-required'),
                        max: {
                          value: new Date().getFullYear(),
                          message: 'Год не может быть в будущем',
                        },
                        min: {
                          value: 2010,
                          message: 'Оборудование слишком старое',
                        },
                      })}
                    />
                    {typeof errors.year?.message === 'string' && (
                      <ErrorMessage>{errors.year.message}</ErrorMessage>
                    )}
                  </div>
                </div>
                <div className="new-section__info-blocks">
                  <div className="new-section__info-block">
                    <Label forElement="condition">{t('condition')}</Label>
                    <Dropdown
                      name="condition"
                      control={control}
                      options={conditions}
                      rules={{ required: t('condition-required') }}
                    />
                  </div>
                  {listingType === 'rent' && (
                    <div className="new-section__info-block">
                      <Label forElement="daily_rental_rate">
                        {t('daily-rental-rate')}
                      </Label>
                      <Input
                        id="daily_rental_rate"
                        type="number"
                        placeholder="5000 KZT"
                        {...register('daily_rental_rate', {
                          required: t('daily-rental-rate-required'),
                        })}
                      />
                      {typeof errors.daily_rental_rate?.message ===
                        'string' && (
                        <ErrorMessage>
                          {errors.daily_rental_rate.message}
                        </ErrorMessage>
                      )}
                    </div>
                  )}

                  {listingType === 'sell' && (
                    <div className="new-section__info-block">
                      <Label forElement="purchase_price">
                        {t('purchase-price')}
                      </Label>
                      <Input
                        id="purchase_price"
                        type="number"
                        placeholder="25000 KZT"
                        {...register('purchase_price', {
                          required: t('purchase-price-required'),
                        })}
                      />
                      {typeof errors.purchase_price?.message === 'string' && (
                        <ErrorMessage>
                          {errors.purchase_price.message}
                        </ErrorMessage>
                      )}
                    </div>
                  )}
                </div>
                <div className="new-section__info-blocks">
                  <div className="new-section__info-block">
                    <Label forElement="location_city">
                      {t('location-city')}
                    </Label>
                    <Input
                      id="location_city"
                      placeholder="Астана"
                      {...register('location_city', {
                        required: t('location-city-required'),
                      })}
                    />
                    {typeof errors.location_city?.message === 'string' && (
                      <ErrorMessage>
                        {errors.location_city.message}
                      </ErrorMessage>
                    )}
                  </div>
                  <div className="new-section__info-block">
                    <Label forElement="location_address">
                      {t('location-address')}
                    </Label>
                    <Input
                      id="location_address"
                      placeholder="Мангилик Ел"
                      {...register('location_address', {
                        required: t('location-address-required'),
                      })}
                    />
                    {typeof errors.location_address?.message === 'string' && (
                      <ErrorMessage>
                        {errors.location_address.message}
                      </ErrorMessage>
                    )}
                  </div>
                </div>
                <div className="new-section__info-blocks">
                  <div className="new-section__info-block">
                    <Label forElement="description">{t('description')}</Label>
                    <Textarea
                      id="description"
                      placeholder={t('equipment-description-placeholder')}
                      {...register('description', {
                        required: 'Требуется заполнить описание!',
                      })}
                    />

                    {typeof errors.description?.message === 'string' && (
                      <ErrorMessage>{errors.description.message}</ErrorMessage>
                    )}
                  </div>
                </div>
                <Button
                  type="submit"
                  variant="default"
                  width="100%"
                  isLoading={isLoading}
                >
                  {isLoading ? 'Создание...' : t('confirm-submit')}
                </Button>
              </div>
            </Card>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewSection;
