'use client'

import { BrandsList, useBrands } from '@/5-entities/brand'
import { useTranslations } from 'next-intl'
import { SectionWithContent } from '@/6-shared/ui/SectionWithContent/SectionWithContent'
import { Title } from '@/6-shared/ui/Title/Title'
import { TitleDescription } from '@/6-shared/ui/TitleDescription/TitleDescription'

const BrandsSection = () => {
  const { brands, isLoading: isBrandsLoading } = useBrands()

  const t = useTranslations('BrandsPage')

  return (
    <section className="brands-section">
      <div className="brands-section__wrapper">
        <SectionWithContent>
          <div className="brands-section__titles">
            <div className="brands-section__title">
              <Title size="h1">{t('brands')}</Title>
            </div>
            <div className="brands-section_description">
              <TitleDescription color="gray">
                {t('brands-all')} {brands?.length} {t('brands-amount')}
              </TitleDescription>
            </div>
          </div>
          {brands && <BrandsList brands={brands} />}
        </SectionWithContent>
      </div>
    </section>
  )
}

export default BrandsSection
