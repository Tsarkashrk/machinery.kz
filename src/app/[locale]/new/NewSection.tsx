'use client'

import Card from '@/6-shared/ui/Cards/Card/Card'
import Button from '@/6-shared/ui/Buttons/Button'
import { Input } from '@/6-shared/ui/Input/Input'
import Label from '@/6-shared/ui/Label/Label'
import TextMuted from '@/6-shared/ui/TextMuted/TextMuted'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config'
import Dropdown from '@/6-shared/ui/Dropdown/Dropdown'
import InputFile from '@/6-shared/ui/Input/InputFile'
import { equipmentApi, equipmentImagesApi } from '@/6-shared/api'
import { useCategories } from '@/5-entities/category/hooks/useCategories'
import { useProfile } from '@/5-entities/user'
import { useBrands } from '@/5-entities/brand'
import { useTranslations } from 'next-intl'

const NewSection = () => {
  const { brands } = useBrands()

  const handleSelect = (item: { id: number; title: string }) => {
    console.log('Выбранный элемент:', item)
  }

  const { register, handleSubmit, reset, control, watch } = useForm({
    mode: 'onChange',
  })

  const t = useTranslations()

  const listingType = watch('type')

  const { categories } = useCategories()

  const { profile, isLoading, isSuccess } = useProfile()

  const { push } = useRouter()

  const { mutate } = useMutation({
    mutationKey: ['equipment'],
    mutationFn: (data: any) => equipmentApi.createEquipment(data),
    onSuccess(data) {
      toast.success('Listing successfully created!')
      reset()
      console.log(data)
      push(`${PLATFORM_PAGES.PRODUCT}/${data.id}`)
    },
    onError() {
      toast.error('Invalid credentials', { description: 'Try again!' })
    },
  })

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
  ]
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
  ]

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    const formattedData = {
      owner: profile?.id,
      brand: data.manufacturer,
      ...data,
      purchase_price: data.purchase_price | 0,
      daily_rental_rate: data.daily_rental_rate | 0,
      available_for_rent: data.type === 'rent',
      available_for_sale: data.type === 'sell',
    }

    mutate(formattedData, {
      onSuccess: async (createdEquipment: any) => {
        console.log('Equipment created:', createdEquipment)

        console.log(data)

        if (data.image && data.image[0]) {
          const formData = new FormData()
          formData.append('file', data.image[0])
          formData.append('equipment', createdEquipment.id.toString())

          try {
            await equipmentImagesApi.uploadImage(formData)
            toast.success('Image uploaded successfully!')
          } catch (error) {
            console.error('Image upload failed:', error)
          }
        }

        reset()
        push(PLATFORM_PAGES.HOME)
      },
    })
  }

  return (
    <section className="new-section">
      <div className="new-section__wrapper">
        <div className="new-section__cards">
          <Card>
            <div className="new-section__header">
              <div className="new-section__header-text">
                <h1 className="new-section__title">{t('create-new-listing')}</h1>
                <TextMuted>{t('fill-details-listing')}</TextMuted>
              </div>
              {/* <div className="new-section__header-buttons">
                <Button text="Previous" variant="outlined" icon={<ChevronLeft size={ICON_SIZE} />} />
                <Button text="Next" icon={<ChevronRight size={ICON_SIZE} />} />
              </div> */}
            </div>
          </Card>

          <Card>
            <h1 className="new-section__title">{t('upload-images')}</h1>
            <hr />
            <InputFile {...register('image')} onChange={(e) => console.log(e.target.value)} />
            {/* <input
              type="image"
              {...register('image', {
                required: 'image is required!',
              })}
            /> */}
          </Card>
          <form onSubmit={handleSubmit(onSubmit)} className="new-section__form">
            <Card>
              <h1 className="new-section__title">{t('equipment-information')}</h1>
              <hr />
              <div className="new-section__info">
                <div className="new-section__info-blocks">
                  <div className="new-section__info-block">
                    <Label forElement="type">{t('listing-type')}</Label>
                    <Dropdown name="type" control={control} options={listingTypes} rules={{ required: t('listing-type-required') }} />
                  </div>
                  <div className="new-section__info-block">
                    <Label forElement="category">{t('category')}</Label>
                    <Dropdown name="category" control={control} options={categories?.map((category) => ({ ...category, title: category.name, value: category.id })) || []} rules={{ required: t('category-required') }} />
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
                  </div>
                  <div className="new-section__info-block">
                    <Label forElement="model">{t('model')}</Label>
                    <Input id="model" type="text" placeholder="GSR 12V-30" {...register('model', { required: t('model-required') })} />
                  </div>
                </div>
                <div className="new-section__info-blocks">
                  <div className="new-section__info-block">
                    <Label forElement="manufacturer">{t('manufacturer')}</Label>
                    <Dropdown name="manufacturer" control={control} options={brands?.map((brand) => ({ ...brand, title: brand.name, value: brand.id })) || []} rules={{ required: t('manufacturer-required') }} />
                  </div>
                  <div className="new-section__info-block">
                    <Label forElement="year">{t('year')}</Label>
                    <Input id="year" type="number" placeholder="2012" {...register('year', {required: t('year-required')})} />
                  </div>
                </div>
                <div className="new-section__info-blocks">
                  <div className="new-section__info-block">
                    <Label forElement="condition">{t('condition')}</Label>
                    <Dropdown name="condition" control={control} options={conditions} rules={{ required: t('condition-required') }} />
                  </div>
                  {listingType === 'rent' && (
                    <div className="new-section__info-block">
                      <Label forElement="daily_rental_rate">{t('daily-rental-rate')}</Label>
                      <Input id="daily_rental_rate" type="number" placeholder="5000 KZT" {...register('daily_rental_rate', { required: t('daily-rental-rate-required') })} />
                    </div>
                  )}

                  {listingType === 'sell' && (
                    <div className="new-section__info-block">
                      <Label forElement="purchase_price">{t('purchase-price')}</Label>
                      <Input id="purchase_price" type="number" placeholder="25000 KZT" {...register('purchase_price', { required: t('purchase-price-required') })} />
                    </div>
                  )}
                </div>

                <div className="new-section__info-blocks">
                  <div className="new-section__info-block">
                    <Label forElement="description">{t('description')}</Label>
                    <Input
                      id="description"
                      type="text"
                      placeholder={t('equipment-description-placeholder')}
                      {...register('description', {
                        required: 'Description is required!',
                      })}
                    />
                  </div>
                </div>
                <Button type="submit" variant="default" width="100%">
                  {t('confirm-submit')}
                </Button>
              </div>
            </Card>
          </form>
        </div>
      </div>
    </section>
  )
}

export default NewSection
