import { Metadata } from 'next'
import { DashboardSection } from './DashboardSection'

export const metadata: Metadata = {
  title: 'Панель управления',
}

const DashboardPage = () => {
  return <DashboardSection />
}

export default DashboardPage
