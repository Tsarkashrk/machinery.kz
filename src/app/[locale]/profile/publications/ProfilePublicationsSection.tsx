'use client'

import { EquipmentList } from '@/3-widgets/equipment-list'
import { useEquipmentList } from '@/5-entities/equipment'
import { useProfile } from '@/5-entities/user'
import { Title } from '@/6-shared/ui/Title/Title'

export const ProfilePublicationsSection = () => {
  const { profile } = useProfile()

  const ownerId = profile?.id

  const { data: equipmentList, isLoading, isSuccess } = useEquipmentList(ownerId ? { owner: ownerId } : undefined)

  if (equipmentList && equipmentList?.count === 0) {
    return (
      <div className="profile-publications profile-publications--empty">
        <div className="profile-publications__wrapper">
          <Title size='h2'>У вас нет никаких объявлений</Title>
        </div>
      </div>
    )
  }

  return (
    <section className="profile-publications">
      <div className="profile-publications__wrapper">{equipmentList && profile && <EquipmentList isProfile size="small" equipmentList={equipmentList.results} isLoading={isLoading} />}</div>
    </section>
  )
}
