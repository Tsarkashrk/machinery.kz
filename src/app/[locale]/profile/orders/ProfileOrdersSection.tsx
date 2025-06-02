'use client'

import { useEquipmentList } from '@/5-entities/equipment'
import { useProfile } from '@/5-entities/user'
import { Title } from '@/6-shared/ui/Title/Title'

export const ProfileOrdersSection = () => {
  const { profile } = useProfile()

  const ownerId = profile?.id

  const { data: equipmentList, isLoading, isSuccess } = useEquipmentList(ownerId ? { owner: ownerId } : undefined)

  if (equipmentList && equipmentList?.count === 0) {
    return (
      <div className="profile-deals profile-deals--empty">
        <div className="profile-deals__wrapper">
          <Title size="h2">У вас нет никаких сделок</Title>
        </div>
      </div>
    )
  }

  return (
    <section className="profile-deals">
      <div className="profile-deals__wrapper"></div>
    </section>
  )
}
