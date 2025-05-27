import { Metadata } from 'next'
import { PublicationsSection } from './PublicationsSection'

export const metadata: Metadata = {
  title: 'Публикации',
}

const PublicationsPage = () => {
  return <PublicationsSection />
}

export default PublicationsPage
