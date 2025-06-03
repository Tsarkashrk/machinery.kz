'use client'

import { useCreateChat } from '@/5-entities/chat'
import Button from '@/6-shared/ui/Buttons/Button'
import { useParams, useRouter } from 'next/navigation'
import { useProfile } from '@/5-entities/user'
import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config'
import { ProfileCard } from '@/3-widgets/profile-card'
import { EquipmentList } from '@/3-widgets/equipment-list'
import { useEquipmentList } from '@/5-entities/equipment'
import Card from '@/6-shared/ui/Cards/Card/Card'
import { Title } from '@/6-shared/ui/Title/Title'
import { useDealerById } from '@/5-entities/dealer/hooks/useDealerById'
import { useEffect } from 'react'

export const DealerSlug = () => {
  const { profile } = useProfile()
  // const { mutate } = useCreateChat()

  const params = useParams()
  const slug = Array.isArray(params?.id) ? params.id[0] : params?.id

  const router = useRouter()
  const ownerId = Number(slug)
  const buyerId = profile?.id

  const { data: equipmentList, isLoading, isSuccess } = useEquipmentList(ownerId ? { owner: ownerId } : undefined)

  const { user } = useDealerById(Number(slug))

  useEffect(() => {}, [user])

  const handleCreateChat = () => {
    if (!slug) return

    // if (buyerId)
    //   mutate(
    //     {
    //       dealer: ownerId,
    //       buyer: buyerId,
    //       deal_item: 6,
    //     },
    //     {
    //       onSuccess: (chat) => {
    //         router.push(`${PLATFORM_PAGES.MESSAGES}`)
    //       },
    //     },
    //   )
  }

  return (
    <section className="dealer-section">
      <div className="dealer-section__wrapper">
        {user && equipmentList && (
          <Card>
            <ProfileCard
              user={{
                id: user.id,
                name: user.first_name + user.last_name || user.username,
                title: user.user_role,
                location: user.address,
                avatar: user.image_url || '',
                isPro: false,
                stats: {
                  equipment: equipmentList?.count,
                  deals: 0,
                  rating: 0,
                },
              }}
            />
          </Card>
        )}

        <Title size="h1">Список оборудования</Title>
        {equipmentList && <EquipmentList equipmentList={equipmentList.results} isLoading={isLoading} />}
      </div>
    </section>
  )
}
