import { Metadata } from 'next'
import DealersView from './DealersView'

export const metadata: Metadata = {
  title: 'Dealers',
}

const DealersPage = () => {
  return (
    <main>
      <DealersView />
    </main>
  )
}

export default DealersPage
