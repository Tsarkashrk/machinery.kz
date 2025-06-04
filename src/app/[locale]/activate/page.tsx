import { Metadata } from 'next'
import { ActivateSection } from './ActivateSection'

export const metadata: Metadata = {
  title: 'Активация аккаунта',
}

const ActivatePage = () => {
  return <ActivateSection />
}
export default ActivatePage
