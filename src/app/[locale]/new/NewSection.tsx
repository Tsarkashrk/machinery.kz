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

const listingTypes = [
  {
    id: 1,
    title: 'To sell',
    value: 'sell',
  },
  {
    id: 2,
    title: 'To rent out',
    value: 'rent',
  },
]
const conditions = [
  {
    id: 1,
    title: 'New',
    value: 'new',
  },
  {
    id: 2,
    title: 'Used',
    value: 'used',
  },
]

const NewSection = () => {
  const { brands } = useBrands()

  const handleSelect = (item: { id: number; title: string }) => {
    console.log('Выбранный элемент:', item)
  }

  const { register, handleSubmit, reset, control, watch } = useForm({
    mode: 'onChange',
  })

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

  console.log(profile)

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
                <h1 className="new-section__title">Create New Listing</h1>
                <TextMuted>Please fill in all the details to get approval for listing creation.</TextMuted>
              </div>
              {/* <div className="new-section__header-buttons">
                <Button text="Previous" variant="outlined" icon={<ChevronLeft size={ICON_SIZE} />} />
                <Button text="Next" icon={<ChevronRight size={ICON_SIZE} />} />
              </div> */}
            </div>
          </Card>

          <Card>
            <h1 className="new-section__title">Upload Images</h1>
            <hr />
            {/* <InputFile {...register('image', { required: 'Image is required!' })} onChange={(e) => console.log(e.target.value)} /> */}
            <input
              type="image"
              {...register('image', {
                required: 'image is required!',
              })}
            />
          </Card>
          <form onSubmit={handleSubmit(onSubmit)} className="new-section__form">
            <Card>
              <h1 className="new-section__title">Equipment information</h1>
              <hr />
              <div className="new-section__info">
                <div className="new-section__info-blocks">
                  <div className="new-section__info-block">
                    <Label text="Listing type" forElement="type" />
                    <Dropdown name="type" control={control} options={listingTypes} rules={{ required: 'Listing type is required!' }} />
                  </div>
                  <div className="new-section__info-block">
                    <Label text="Category" forElement="category" />
                    <Dropdown name="category" control={control} options={categories?.map((category) => ({ ...category, title: category.name, value: category.id })) || []} rules={{ required: 'Category is required!' }} />
                  </div>
                </div>
                <div className="new-section__info-blocks">
                  <div className="new-section__info-block">
                    <Label text="Name" forElement="name" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Cordless Drill Bosch"
                      {...register('name', {
                        required: 'Name is required!',
                      })}
                    />
                  </div>
                  <div className="new-section__info-block">
                    <Label text="Model" forElement="model" />
                    <Input
                      id="model"
                      type="text"
                      placeholder="GSR 12V-30"
                      {...register('model', {
                        required: 'Model is required!',
                      })}
                    />
                  </div>
                </div>
                <div className="new-section__info-blocks">
                  <div className="new-section__info-block">
                    <Label text="Manufacturer" forElement="manufacturer" />
                    <Dropdown name="manufacturer" control={control} options={brands?.map((brand) => ({ ...brand, title: brand.name, value: brand.id })) || []} rules={{ required: 'Manufacturer is required!' }} />
                  </div>
                  <div className="new-section__info-block">
                    <Label text="Year" forElement="year" />
                    <Input
                      id="year"
                      type="number"
                      placeholder="2012"
                      {...register('year', {
                        required: 'Year is required!',
                      })}
                    />
                  </div>
                </div>
                <div className="new-section__info-blocks">
                  <div className="new-section__info-block">
                    <Label text="Condition" forElement="condition" />
                    <Dropdown name="condition" control={control} options={conditions} rules={{ required: 'Condition is required!' }} />
                  </div>
                  {listingType === 'rent' && (
                    <div className="new-section__info-block">
                      <Label text="Daily rental price" forElement="daily_rental_rate" />
                      <Input id="daily_rental_rate" type="number" placeholder="5000 KZT" {...register('daily_rental_rate', { required: 'Rental rate is required!' })} />
                    </div>
                  )}

                  {listingType === 'sell' && (
                    <div className="new-section__info-block">
                      <Label text="Purchase price" forElement="purchase_price" />
                      <Input id="purchase_price" type="number" placeholder="25000 KZT" {...register('purchase_price', { required: 'Purchase price is required!' })} />
                    </div>
                  )}
                </div>

                <div className="new-section__info-blocks">
                  <div className="new-section__info-block">
                    <Label text="Description" forElement="description" />
                    <Input
                      id="description"
                      type="text"
                      placeholder="Very powerfull machine"
                      {...register('description', {
                        required: 'Description is required!',
                      })}
                    />
                  </div>
                </div>
                <Button type="submit" variant="default" width="100%">
                  Confirm & Submit
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
