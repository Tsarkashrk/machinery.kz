'use client'

import Card from '@/shared/components/Cards/Card/Card'
import Button from '@/shared/ui/Buttons/Button'
import Input from '@/shared/ui/Input/Input'
import Label from '@/shared/ui/Label/Label'
import TextMuted from '@/shared/ui/TextMuted/TextMuted'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { PLATFORM_PAGES } from '@/shared/config/pages-url.config'
import Dropdown from '@/shared/ui/Dropdown/Dropdown'
import InputFile from '@/shared/ui/Input/InputFile'
import { equipmentApi, imagesApi, useEquipmentCategories } from '@/shared/api'
import { useProfile } from '@/entities/user'

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
  const handleSelect = (item: { id: number; title: string }) => {
    console.log('Выбранный элемент:', item)
  }

  const { register, handleSubmit, reset, control, watch } = useForm({
    mode: 'onChange',
  })

  const listingType = watch('type')

  const categories = useEquipmentCategories()

  const user = useProfile()

  const { push } = useRouter()

  const { mutate } = useMutation({
    mutationKey: ['equipment'],
    mutationFn: (data: any) => equipmentApi.createEquipment(data),
    onSuccess() {
      toast.success('Listing successfully created!')
      reset()
      // push(PLATFORM_PAGES.PROFILE)
    },
    onError() {
      toast.error('Invalid credentials', { description: 'Try again!' })
    },
  })

  // const onSubmit: SubmitHandler<any> = (data: any) => {
  //   console.log(data)
  //   mutate({ owner: 1, ...data, purchase_price: 12000 })
  // }

  console.log(user)

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    console.log('Submitting:', data)

    const listingType = listingTypes.find((type) => type.value === data.type)

    const formattedData = {
      owner: user?.data?.id,
      ...data,
      purchase_price: data.purchase_price | 0,
      daily_rental_rate: data.daily_rental_rate | 0,
      available_for_rent: data.type === 'rent',
      available_for_sale: data.type === 'sell',
    }

    mutate(formattedData, {
      onSuccess: async (createdEquipment: any) => {
        // console.log('Equipment created:', createdEquipment)

        // if (data.image && data.image[0]) {
        //   const imagePayload = {
        //     equipment: createdEquipment.data.id,
        //     image_url: data.image[0],
        //     image_type: 'webp',
        //   }

        //   try {
        //     await imagesApi.uploadImage(imagePayload)
        //     toast.success('Image uploaded successfully!')
        //   } catch (error) {
        //     console.error('Image upload failed:', error)
        //   }
        // }

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
                <TextMuted text="Please fill in all the details to get approval for listing creation." />
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
            <InputFile {...register('image', { required: 'Image is required!' })} />
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

                    <Dropdown name="category" control={control} options={categories?.data?.map((cat: any) => ({ ...cat, title: cat.name, value: cat.id })) || []} rules={{ required: 'Category is required!' }} />
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
                    <Input
                      id="manufacturer"
                      type="text"
                      placeholder="Bosch"
                      {...register('manufacturer', {
                        required: 'Manufacturer is required!',
                      })}
                    />
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
                <Button type="submit" text="Confirm & Submit" variant="default" width="100%" />
              </div>
            </Card>
          </form>
        </div>
      </div>
    </section>
  )
}

export default NewSection
