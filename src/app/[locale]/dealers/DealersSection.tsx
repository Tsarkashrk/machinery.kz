'use client'

import { DealersList } from '@/3-widgets/dealers-list'
import { ProfileCard } from '@/3-widgets/profile-card'
import { useDealersList } from '@/5-entities/dealer'
import { SectionWithContent } from '@/6-shared/ui/SectionWithContent/SectionWithContent'
import { Title } from '@/6-shared/ui/Title/Title'
import { TitleDescription } from '@/6-shared/ui/TitleDescription/TitleDescription'
import { useTranslations } from 'next-intl'

const DealersSection = () => {
  const t = useTranslations('DealersPage')

  const { data, isLoading, error } = useDealersList()

  console.log(data)

  return (
    <section className="dealers-section">
      <SectionWithContent>
        <div className="dealers-section__header">
          <Title>{t('title')}</Title>
          <TitleDescription color="gray">
            {t('dealers-all')} {data?.companies?.length + data?.users?.length} {t('dealers-amount')}
          </TitleDescription>
        </div>
        <DealersList users={data?.users} companies={data?.companies} />
      </SectionWithContent>
    </section>
  )
}

export default DealersSection
