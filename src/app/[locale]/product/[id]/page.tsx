'use client'

import Card from '@/6-shared/ui/Cards/Card/Card'
import Button from '@/6-shared/ui/Buttons/Button'
import DatePicker from '@/6-shared/ui/DatePicker/DatePicker'
import TextMuted from '@/6-shared/ui/TextMuted/TextMuted'
import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config'
import { useProfile } from '@/5-entities/user'
import { rentApi, equipmentApi } from '@/6-shared/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

const product = [
  {
    name: 'Some text here',
    description: 'description text here',
    img: '/assets/eq1.webp',
  },
  {
    name: 'Some text here',
    description: 'description text here',
    img: '/assets/eq2.webp',
  },
  {
    name: 'Some text here',
    description: 'description text here',
    img: '/assets/eq3.webp',
  },
]

const TABS = [
  { id: 'description', label: 'Описание' },
  { id: 'specifications', label: 'Спецификации' },
  { id: 'rental_terms', label: 'Условия аренды' },
]

const ProductIdPage = () => {
  const [selectedTab, setSelectedTab] = useState('description')
  const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([null, null])
  const [selectedImage, setSelectedImage] = useState(product[0].img)
  const [total, setTotal] = useState<any>('')

  const { id } = useParams()
  const user: any = useProfile()

  

  const { data, isLoading } = useQuery<any>({
    queryKey: ['equipment'],
    queryFn: () => equipmentApi.getEquipmentById(Number(id)),
  })

  const equipmentData = data

  const { register, handleSubmit, reset } = useForm({
    mode: 'onChange',
  })

  console.log(data)

  const { push } = useRouter()

  const { mutate } = useMutation({
    mutationKey: ['rent'],
    mutationFn: (data: any) => rentApi.rentEquipment(data),
    onSuccess() {
      toast.success('The lease has started successfully!')
      reset()
      push(PLATFORM_PAGES.PROFILE)
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

  return (
    <section className="product-slug">
      <div className="product-slug__wrapper">
        <div className="product-slug__cards">
          <Card>
            <div className="product-slug__info">
              <img className="product-slug__img" src={selectedImage} alt="" />
              <div className="product-slug__images">
                <img className="product-slug__img--small" src={product[0].img} alt="" onClick={() => setSelectedImage(product[0].img)} />
                <img className="product-slug__img--small" src={product[1].img} alt="" onClick={() => setSelectedImage(product[1].img)} />
                <img className="product-slug__img--small" src={product[2].img} alt="" onClick={() => setSelectedImage(product[2].img)} />
              </div>
              <div className="product-slug__details">
                <h1 className="product-slug__h1">{data?.name}</h1>
                <div className="product-slug__info-details">
                  <div className="product-slug__row">
                    <TextMuted>Equipment ID:</TextMuted>
                    <p>{data?.id}</p>
                  </div>
                  <div className="product-slug__row">
                    <TextMuted>Category:</TextMuted>
                    <p>{data?.category_details?.name}</p>
                  </div>
                  <div className="product-slug__row">
                    <TextMuted>Manufacturer:</TextMuted>
                    <p>{data?.manufacturer}</p>
                  </div>
                  <div className="product-slug__row">
                    <TextMuted>Model:</TextMuted>
                    <p>{data?.model}</p>
                  </div>
                  <div className="product-slug__row">
                    <TextMuted>Year:</TextMuted>
                    <p>{data?.year}</p>
                  </div>
                  <div className="product-slug__row">
                    <TextMuted>Condition:</TextMuted>
                    <p>{data?.condition}</p>
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
                  <p className="product-slug__text">{data?.description || 'No description available.'} Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nesciunt nulla error, architecto hic ducimus consectetur? Facere nobis asperiores, nesciunt amet enim ducimus illum. Repudiandae alias aspernatur sapiente nemo voluptate!</p>
                </div>
              )}

              {selectedTab === 'specifications' && (
                <div className="product-slug__specifications">
                  <h1>Спецификации</h1>
                  <ul>
                    <li>
                      <strong>Manufacturer:</strong> {data?.manufacturer}
                    </li>
                    <li>
                      <strong>Model:</strong> {data?.model}
                    </li>
                    <li>
                      <strong>Year:</strong> {data?.year}
                    </li>
                    <li>
                      <strong>Condition:</strong> {data?.condition}
                    </li>
                    <li>
                      <strong>Category:</strong> {data?.category_details?.name}
                    </li>
                  </ul>
                </div>
              )}

              {selectedTab === 'rental_terms' && (
                <div className="product-slug__rental-terms">
                  <h1>Условия аренды</h1>
                  <p className="product-slug__text">Standard rental terms apply. Equipment must be returned in the same condition.</p>
                </div>
              )}
            </div>
          </Card>
          <Card>
            <h1 className="product-slug__price">
              {data?.available_for_rent ? (
                <div className="product-slug__price-block">
                  <div className="product-slug__price-rate">{data?.daily_rental_rate} KZT</div>
                  <TextMuted>в день</TextMuted>
                </div>
              ) : (
                <div className="product-slug__price-block">
                  <div className="product-slug__price-rate">{data?.purchase_price} KZT</div>
                </div>
              )}{' '}
            </h1>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
              <DatePicker onSelectDates={setSelectedDates} />
              <div className="product-slug__button">
                <div className="product-slug__total">
                  <h1>Итоговая цена</h1>
                  <div className="product-slug__line" />
                  <h2>{total} KZT</h2>
                </div>
                <div className="product-slug__button-list">
                  <Button onClick={() => {}} link={`${PLATFORM_PAGES.MESSAGES}`} width="100%">
                    Написать владельцу
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default ProductIdPage
