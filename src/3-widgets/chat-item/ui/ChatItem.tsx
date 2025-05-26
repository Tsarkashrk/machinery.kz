import { IChatResponse } from '@/5-entities/chat'
import { PLATFORM_PAGES } from '@/6-shared/config/pages-url.config'
import { formatTime } from '@/6-shared/lib/utils'
import Avatar from '@/6-shared/ui/Avatar/Avatar'
import { Description } from '@/6-shared/ui/Description/Description'
import TextMuted from '@/6-shared/ui/TextMuted/TextMuted'
import { Title } from '@/6-shared/ui/Title/Title'

type Props = {
  chat: IChatResponse
  isActive?: boolean
  onClick?: (chatId: number) => void
}

export const ChatItem = ({ chat, isActive, onClick }: Props) => {
  const buyer = chat.buyer_details
  const dealer = chat.dealer_details

  const handleClick = () => {
    if (onClick) {
      onClick(chat.id)
    }
  }

  return (
    <div className={`chat-item chat-item--${isActive && 'active'}`} onClick={handleClick}>
      <div className="chat-item__wrapper">
        <div className="chat-item__avatar">
          <Avatar link={`${PLATFORM_PAGES.DEALERS}/${buyer.id}`} username={dealer.username} size="big" />
        </div>
        <div className="chat-item__info">
          <Title size="h4" fontWeight="500" fontFamily="geist">
            {dealer.username}
          </Title>
          <div className="chat-item__description">
            <Description>{chat.last_message?.content && chat.last_message.content}</Description>
          </div>
        </div>
        <div className="chat-item__timestamp">
          <TextMuted>{chat.last_message?.timestamp && formatTime(chat.last_message?.timestamp)}</TextMuted>
        </div>
      </div>
    </div>
  )
}
