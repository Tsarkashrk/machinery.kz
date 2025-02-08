import { Metadata } from 'next'
import ProfileView from './ProfileView'

export const metadata: Metadata = {
  title: 'Profile',
}

const ProfilePage = () => {
  return (
    <main>
      <ProfileView />
    </main>
  )
}

export default ProfilePage
