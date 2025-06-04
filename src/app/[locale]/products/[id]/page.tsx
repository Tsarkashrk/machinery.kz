'use client'

import Card from '@/6-shared/ui/Cards/Card/Card'
import Button from '@/6-shared/ui/Buttons/Button'
import DatePicker from '@/6-shared/ui/DatePicker/DatePicker'
import TextMuted from '@/6-shared/ui/TextMuted/TextMuted'
import { PLATFORM_PAGES, PROFILE_PAGES } from '@/6-shared/config/pages-url.config'
import { useProfile } from '@/5-entities/user'
import { rentApi, equipmentApi } from '@/6-shared/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useEquipmentById } from '@/5-entities/equipment/hooks/useEquipmentById'
import { useCreateChat } from '@/5-entities/chat'

const TABS = [
  { id: 'description', label: 'Описание' },
  { id: 'specifications', label: 'Характеристики' },
  { id: 'rental_terms', label: 'Условия аренды' },
]

const ProductIdPage = () => {
  const { id } = useParams()
  const user: any = useProfile()

  const { equipmentData } = useEquipmentById(Number(id))

  const [selectedTab, setSelectedTab] = useState('description')
  const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([null, null])
  const [total, setTotal] = useState<any>('')

  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    if (equipmentData?.images?.[0]?.image_url) {
      setSelectedImage(equipmentData.images[0].image_url)
    }
  }, [equipmentData])

  const { register, handleSubmit, reset } = useForm({
    mode: 'onChange',
  })

  const { push } = useRouter()

  const { mutate } = useMutation({
    mutationKey: ['rent'],
    mutationFn: (data: any) => rentApi.rentEquipment(data),
    onSuccess() {
      toast.success('The lease has started successfully!')
      reset()
      push(PROFILE_PAGES.PROFILE)
    },
    onError() {
      toast.error('Invalid credentials', { description: 'Try again!' })
    },
  })

  const calculateTotalAmount = (selectedDates: [Date | null, Date | null], dailyRate: number) => {
    if (!selectedDates[0] || !selectedDates[1]) return 0

    const startDate = new Date(selectedDates[0])
    const endDate = new Date(selectedDates[1])

    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    return days * dailyRate
  }

  useEffect(() => {
    if (equipmentData?.daily_rental_rate) {
      const totalAmount = calculateTotalAmount(selectedDates, Number(equipmentData.daily_rental_rate))
      setTotal(totalAmount)
    }
  }, [selectedDates, equipmentData?.daily_rental_rate])

  const formatDateToAPI = (date: Date | null) => {
    return date ? date.toISOString() : null
  }

  const onSubmit: SubmitHandler<any> = (data: any) => {
    if (!selectedDates[0] || !selectedDates[1]) {
      toast.error('Выберите даты аренды!')
      return
    }

    console.log(data)

    const totalAmount = calculateTotalAmount(selectedDates, Number(equipmentData?.daily_rental_rate))

    setTotal(totalAmount)

    mutate({
      rental_terms: 'sadfsdf',
      equipment: id,
      renter: user?.data?.id,
      start_date: formatDateToAPI(selectedDates[0]),
      end_date: formatDateToAPI(selectedDates[1]),
      total_amount: totalAmount,
      status: 'pending',
      ...data,
    })
  }

  const params = useParams()
  const slug = Array.isArray(params?.id) ? params.id[0] : params?.id
  const router = useRouter()
  const { profile } = useProfile()

  const { mutate: createChatMutation } = useCreateChat()

  const handleCreateChat = () => {
    if (!slug || !profile?.id) return

    if (equipmentData) {
      createChatMutation(
        {
          dealer: equipmentData.owner,
          buyer: profile.id,
          deal_item: equipmentData.id,
        },
        {
          onSuccess: (chat) => {
            router.push(`${PLATFORM_PAGES.MESSAGES}`)
          },
        },
      )
    }
  }

  return (
    <section className="product-slug">
      <div className="product-slug__wrapper">
        <div className="product-slug__cards">
          <Card>
            <div className="product-slug__info">
              <img className="product-slug__img" src={selectedImage || `/assets/profile-placeholder.png`} alt="" />
              <div className="product-slug__images">
                {equipmentData?.images.map((image) => (
                  <img key={image.id} className="product-slug__img--small" src={image.image_url} alt="" onClick={() => setSelectedImage(image.image_url)} />
                ))}
              </div>
              <div className="product-slug__details">
                <h1 className="product-slug__h1">{equipmentData?.name}</h1>
                <div className="product-slug__info-details">
                  <div className="product-slug__row">
                    <TextMuted>Equipment ID:</TextMuted>
                    <p>{equipmentData?.id}</p>
                  </div>
                  <div className="product-slug__row">
                    <TextMuted>Category:</TextMuted>
                    <p>{equipmentData?.category_details?.name}</p>
                  </div>
                  <div className="product-slug__row">
                    <TextMuted>Manufacturer:</TextMuted>
                    <p>{equipmentData?.manufacturer}</p>
                  </div>
                  <div className="product-slug__row">
                    <TextMuted>Model:</TextMuted>
                    <p>{equipmentData?.model}</p>
                  </div>
                  <div className="product-slug__row">
                    <TextMuted>Year:</TextMuted>
                    <p>{equipmentData?.year}</p>
                  </div>
                  <div className="product-slug__row">
                    <TextMuted>Condition:</TextMuted>
                    <p>{equipmentData?.condition}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-slug__tabs">
              {TABS.map((tab) => (
                <button key={tab.id} className={`product-slug__tab ${selectedTab === tab.id ? 'product-slug__tab--active' : ''}`} onClick={() => setSelectedTab(tab.id)}>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="product-slug__tab-content">
              {selectedTab === 'description' && (
                <div className="product-slug__description">
                  <h1>Описание</h1>
                  <p className="product-slug__text">{equipmentData?.description || 'No description available.'}</p>
                </div>
              )}

              {selectedTab === 'specifications' && (
                <div className="product-slug__specifications">
                  <h1>Спецификации</h1>
                  <ul>
                    <li>
                      <strong>Manufacturer:</strong> {equipmentData?.manufacturer}
                    </li>
                    <li>
                      <strong>Model:</strong> {equipmentData?.model}
                    </li>
                    <li>
                      <strong>Year:</strong> {equipmentData?.year}
                    </li>
                    <li>
                      <strong>Condition:</strong> {equipmentData?.condition}
                    </li>
                    <li>
                      <strong>Category:</strong> {equipmentData?.category_details?.name}
                    </li>
                  </ul>
                </div>
              )}

              {selectedTab === 'rental_terms' && (
                <div className="product-slug__rental-terms">
                  <h1>Условия аренды</h1>
                  <p className="product-slug__text">Действуют стандартные условия аренды. Оборудование должно быть возвращено в прежнем состоянии</p>
                </div>
              )}
            </div>
          </Card>
          <Card>
            <h1 className="product-slug__price">
              {equipmentData?.available_for_rent ? (
                <div className="product-slug__price-block">
                  <div className="product-slug__price-rate">{equipmentData?.daily_rental_rate} KZT</div>
                  <TextMuted>в день</TextMuted>
                </div>
              ) : (
                <div className="product-slug__price-block">
                  <div className="product-slug__price-rate">{equipmentData?.purchase_price} KZT</div>
                </div>
              )}{' '}
            </h1>
            <hr />
            {equipmentData?.available_for_rent && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <DatePicker onSelectDates={setSelectedDates} />
                <div className="product-slug__button">
                  <div className="product-slug__total">
                    <h1>Итоговая цена</h1>
                    <div className="product-slug__line" />
                    <h2>{total} KZT</h2>
                  </div>
                  <div className="product-slug__button-list"></div>
                </div>
              </form>
            )}
            <Button onClick={handleCreateChat} width="100%">
              Написать владельцу
            </Button>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default ProductIdPage
