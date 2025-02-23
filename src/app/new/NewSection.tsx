'use client'

import Card from '@/components/Cards/Card/Card'
import Button from '@/components/ui/Buttons/Button'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import Input from '@/components/ui/Input/Input'
import Label from '@/components/ui/Label/Label'
import TextMuted from '@/components/ui/TextMuted/TextMuted'
import { ICON_SIZE } from '@/constants/constants'
import { Plus } from 'lucide-react'
import React from 'react'
import DropDown from '@/components/ui/Dropdown/Dropdown'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { equipmentService } from '@/services/equipment.service'
import { toast } from 'sonner'
import { PLATFORM_PAGES } from '@/config/pages-url.config'
import Dropdown from '@/components/ui/Dropdown/Dropdown'

const listingTypes = [
  {
    id: 1,
    title: 'To sell',
  },
  {
    id: 2,
    title: 'To rent out',
  },
]

const catalogItems = [
  {
    id: 1,
    title: 'Power tools',
    img: 'assets/cat1-d.webp',
    link: 'power-tools',
  },
  {
    id: 2,
    title: 'Generators',
    img: 'assets/cat2-d.webp',
    link: 'generators',
  },
  {
    id: 3,
    title: 'Compressors',
    img: 'assets/cat3-d.webp',
    link: 'compressors',
  },
  {
    id: 4,
    title: 'Welding equipment',
    img: 'assets/cat4-d.webp',
    link: 'welding-equipment',
  },
  {
    id: 5,
    title: 'Machines',
    img: 'assets/cat6-d.webp',
    link: 'machines',
  },
  {
    id: 6,
    title: 'Pumps and motor pumps',
    img: 'assets/cat7-d.webp',
    link: 'cleaning-equipment',
  },
  {
    id: 7,
    title: 'Gardening equipment and tools',
    img: 'assets/cat8-d.webp',
    link: 'gardening-equipment-and-tools',
  },
  {
    id: 8,
    title: 'Pumps and motor pumps',
    img: 'assets/cat9-d.webp',
    link: 'pumps-and-motor-pumps',
  },
  {
    id: 9,
    title: 'Сlimate equipment',
    img: 'assets/cat10-d.webp',
    link: 'climate-equipment',
  },
]

const conditions = [
  {
    id: 1,
    title: 'New',
  },
  {
    id: 2,
    title: 'Used',
  },
]

const NewSection = () => {
  const handleSelect = (item: { id: number; title: string }) => {
    console.log('Выбранный элемент:', item)
  }

  const { register, handleSubmit, reset, control } = useForm({
    mode: 'onChange',
  })

  const { push } = useRouter()

  const { mutate } = useMutation({
    mutationKey: ['equipment'],
    mutationFn: (data: any) => equipmentService.createEquipment(data),
    onSuccess() {
      toast.success('Successfully logged in!')
      reset()
      // push(PLATFORM_PAGES.PROFILE)
    },
    onError() {
      toast.error('Invalid credentials', { description: 'Try again!' })
    },
  })

  const onSubmit: SubmitHandler<any> = (data: any) => {
    console.log(data)
    mutate({ owner: 1, ...data, purchase_price: 12000 })
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
              <div className="new-section__header-buttons">
                <Button text="Previous" variant="outlined" icon={<ChevronLeft size={ICON_SIZE} />} />
                <Button text="Next" icon={<ChevronRight size={ICON_SIZE} />} />
              </div>
            </div>
          </Card>

          <Card>
            <h1 className="new-section__title">Upload Images</h1>
            <hr />
            <div className="new-section__images">
              <img className="new-section__image" src="assets/GSR12V-30.webp" alt="" />
            </div>
            <Button icon={<Plus size={ICON_SIZE} />} text="Add Pictures" variant="new" width="100%" />
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

                    <Dropdown name="category" control={control} options={catalogItems} rules={{ required: 'Category is required!' }} />
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
                      type="text"
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
                  <div className="new-section__info-block">
                    <Label text="Daily rental price" forElement="price" />
                    <Input
                      id="price"
                      type="number"
                      placeholder="12000"
                      {...register('daily_rental_rate', {
                        required: 'Rental rate is required!',
                      })}
                    />
                  </div>
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
                <Button type="submit" icon={<Plus size={ICON_SIZE} />} text="Create listing" variant="new" width="100%" />
              </div>
            </Card>
          </form>
        </div>
      </div>
    </section>
  )
}

export default NewSection
