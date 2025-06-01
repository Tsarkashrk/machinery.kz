import { Metadata } from 'next'
import ProfileSection from './ProfileSection'
import Sidebar from '@/6-shared/ui/Sidebar/Sidebar'
import { ListChecks, ShoppingBasket, User } from 'lucide-react'
import { ICON_SIZE } from '@/6-shared/constants/constants'
import { ProfileSidebar } from '@/4-features/profile'

export const metadata: Metadata = {
  title: 'Profile',
}

const ProfilePage = () => {
  return (
    <div className="profile">
      <div className="profile__wrapper">
        <ProfileSection />
      </div>
    </div>
  )
}

export default ProfilePage
