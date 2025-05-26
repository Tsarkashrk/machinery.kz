import { Title } from '@/6-shared/ui/Title/Title'
import { IChatMessage } from '../model/chat.model'
import { Description } from '@/6-shared/ui/Description/Description'
import Avatar from '@/6-shared/ui/Avatar/Avatar'
import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config'
import Link from 'next/link'
import TextMuted from '@/6-shared/ui/TextMuted/TextMuted'
import { formatTime } from '@/6-shared/lib/utils'
import { CheckCheck } from 'lucide-react'
import { ICON_SIZE } from '@/6-shared/constants/constants'

type Props = {
  message: IChatMessage
}

export const ChatMessage = ({ message }: Props) => {
  const senderDetails = message?.sender_details

  return (
    <div className="chat-message">
      <div className="chat-message__wrapper">
        <Avatar link={`${PLATFORM_PAGES.DEALERS}/${senderDetails.id}`} username={senderDetails.username} />
        <div className="chat-message__info">
          <Link href={`${PLATFORM_PAGES.DEALERS}/${senderDetails.id}`}>
            <Title size="h4" color="black" fontSize="15px" fontWeight="500" fontFamily="geist">
              {senderDetails.username}
            </Title>
          </Link>
          <div className="chat-message__footer">
            <Description>{message?.content}</Description>
            <TextMuted>{message.timestamp && formatTime(message?.timestamp)}</TextMuted>
            <CheckCheck size={ICON_SIZE} />
          </div>
        </div>
      </div>
    </div>
  )
}
