import { AdminSidebar } from '@/4-features/admin-sidebar/ui/AdminSidebar'
import { SectionWithContent } from '@/6-shared/ui/SectionWithContent/SectionWithContent'
import { Title } from '@/6-shared/ui/Title/Title'

export const ReviewsSection = () => {
  return (
    <section className="dashboard-section">
      <div className="dashboard-section__wrapper">
        {/* <SectionWithContent>
          <Title>Dashboard Section</Title>
        </SectionWithContent> */}
        <AdminSidebar />
      </div>
    </section>
  )
}
