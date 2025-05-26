'use client'

import { useCreateChat } from '@/5-entities/chat'
import Button from '@/6-shared/ui/Buttons/Button'
import { useParams, useRouter } from 'next/navigation'
import { useProfile } from '@/5-entities/user'
import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config'

export const DealerSlug = () => {
  const params = useParams()
  const slug = Array.isArray(params?.id) ? params.id[0] : params?.id
  const router = useRouter()
  const { profile } = useProfile()

  const { mutate } = useCreateChat()

  const handleCreateChat = () => {
    if (!slug || !profile?.id) return

    mutate(
      {
        dealer: Number(slug),
        buyer: profile.id,
        deal_item: 5,
      },
      {
        onSuccess: (chat) => {
          router.push(`${PLATFORM_PAGES.MESSAGES}`)
        },
      },
    )
  }

  return (
    <section className="dealer-section">
      <div className="dealer-section__wrapper">
        <Button onClick={handleCreateChat}>Написать сообщение</Button>
      </div>
    </section>
  )
}
