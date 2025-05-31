// import { useMessages } from '@/shared/hooks/useChat';
// import { MessageItem } from '../MessageItem/MessageItem';
// import { useEffect, useRef } from 'react';

// interface MessagesListProps {
//   chatId: string;
//   currentUserId: string;
// }

// export const MessagesList = ({ chatId, currentUserId }: MessagesListProps) => {
//   const { data: messages, isLoading, error } = useMessages(chatId);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-64 text-red-500">
//         Ошибка загрузки сообщений
//       </div>
//     );
//   }

//   if (!messages || messages.length === 0) {
//     return (
//       <div className="flex items-center justify-center h-64 text-gray-500">
//         Нет сообщений. Начните диалог!
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 overflow-y-auto px-4 py-4">
//       {messages.map((message, index) => {
//         const prevMessage = messages[index - 1];
//         const showAvatar = !prevMessage || prevMessage.sender_id !== message.sender_id;
        
//         return (
//           <MessageItem
//             key={message.id}
//             message={message}
//             isOwn={message.sender_id === currentUserId}
//             showAvatar={showAvatar}
//           />
//         );
//       })}
//       <div ref={messagesEndRef} />
//     </div>
//   );
// };