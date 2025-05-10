import { Metadata } from 'next'
import DealersSection from './DealersSection'

export const metadata: Metadata = {
  title: 'Dealers',
}

const DealersPage = () => {
  return <DealersSection />
}

export default DealersPage
