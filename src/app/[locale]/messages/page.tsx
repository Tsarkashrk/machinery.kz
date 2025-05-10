import { Metadata } from 'next'
import MessagesSection from './MessagesSection'

export const metadata: Metadata = {
  title: 'Messages',
}

const MessagesPage = () => {
  return <MessagesSection />
}

export default MessagesPage
