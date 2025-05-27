import { Metadata } from 'next'
import { UsersSection } from './UsersSection'

export const metadata: Metadata = {
  title: 'Пользователи',
}

const UsersPage = () => {
  return <UsersSection />
}

export default UsersPage
