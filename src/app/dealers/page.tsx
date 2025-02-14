import { Metadata } from 'next'
import DealersView from './DealersSection'

export const metadata: Metadata = {
  title: 'Dealers',
}

const DealersPage = () => {
  return (
      <DealersView />
  )
}

export default DealersPage
