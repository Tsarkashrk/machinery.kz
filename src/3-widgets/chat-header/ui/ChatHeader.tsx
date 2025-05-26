import { Wifi, WifiOff } from 'lucide-react'

type Props = {
  username: string
  isOnline?: boolean
  isReconnecting?: boolean
}

export const ChatHeader = ({ username, isOnline, isReconnecting }: Props) => {
  return (
    <div className="chat-header">
      <div className="chat-header__wrapper">
        <div className="chat-header__info">
          <h3 className="chat-header__username">{username}</h3>
          <div className="chat-header__status">{isReconnecting ? <span className="text-yellow-500 text-sm">переподключение...</span> : isOnline ? <span className="text-green-500 text-sm">в сети</span> : <span className="text-gray-500 text-sm">не в сети</span>}</div>
        </div>
        <div className="chat-header__connection">{isReconnecting ? <WifiOff className="text-yellow-500" size={20} /> : isOnline ? <Wifi className="text-green-500" size={20} /> : <WifiOff className="text-red-500" size={20} />}</div>
      </div>
    </div>
  )
}
