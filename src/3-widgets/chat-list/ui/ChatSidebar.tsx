// import { useState } from 'react'
// import { ChatList } from './ChatList'
// import { useUnreadMessages } from '@/shared/hooks/useChat'
// import { Input } from '@/6-shared/ui/Input/Input'
// import { Button } from '@/6-shared/ui/Button/Button'

// interface ChatSidebarProps {
//   onChatSelect: (chatId: string) => void
//   activeChatId?: string
// }

// export const ChatSidebar = ({ onChatSelect, activeChatId }: ChatSidebarProps) => {
//   const [searchQuery, setSearchQuery] = useState('')
//   const { data: unreadData } = useUnreadMessages()

//   return (
//     <div className="flex flex-col h-full bg-white border-r border-gray-200">
//       {/* Header */}
//       <div className="p-4 border-b border-gray-200">
//         <div className="flex items-center justify-between mb-4">
//           <h1 className="text-xl font-semibold text-gray-900">Чаты</h1>
//           {unreadData && unreadData.count > 0 && <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">{unreadData.count}</span>}
//         </div>

//         {/* Search */}
//         <div className="relative">
//           <Input type="text" placeholder="Поиск чатов..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
//           <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//           </svg>
//         </div>
//       </div>

//       {/* New Chat Button */}
//       <div className="p-4 border-b border-gray-200">
//         <Button className="w-full" variant="primary">
//           <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//           </svg>
//           Новый чат
//         </Button>
//       </div>

//       {/* Chat List */}
//       <div className="flex-1 overflow-hidden">
//         <ChatList onChatSelect={onChatSelect} activeChatId={activeChatId} />
//       </div>
//     </div>
//   )
// }
