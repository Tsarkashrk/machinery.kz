// import { Message } from '../../model/types';
// import { Avatar } from '@/shared/ui/Avatar/Avatar';
// import { formatTime } from '@/shared/lib/utils';
// import { cn } from '@/shared/lib/utils';

// interface MessageItemProps {
//   message: Message;
//   isOwn: boolean;
//   showAvatar?: boolean;
// }

// export const MessageItem = ({ message, isOwn, showAvatar = true }: MessageItemProps) => {
//   return (
//     <div className={cn('flex gap-3 mb-4', isOwn && 'flex-row-reverse')}>
//       {showAvatar && !isOwn && (
//         <Avatar 
//           src={message.sender_avatar} 
//           alt={message.sender_name}
//           size="sm"
//         />
//       )}
      
//       <div className={cn('flex flex-col', isOwn ? 'items-end' : 'items-start')}>
//         {!isOwn && showAvatar && (
//           <span className="text-xs text-gray-500 mb-1">
//             {message.sender_name}
//           </span>
//         )}
        
//         <div
//           className={cn(
//             'max-w-xs lg:max-w-md px-4 py-2 rounded-2xl break-words',
//             isOwn 
//               ? 'bg-blue-500 text-white rounded-br-md' 
//               : 'bg-gray-200 text-gray-900 rounded-bl-md'
//           )}
//         >
//           <p className="text-sm">{message?.content}</p>
//         </div>
        
//         <div className="flex items-center gap-1 mt-1">
//           <span className="text-xs text-gray-500">
//             {formatTime(message.timestamp)}
//           </span>
//           {isOwn && (
//             <div className="flex">
//               {message.is_read ? (
//                 <svg className="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
//                 </svg>
//               ) : (
//                 <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
//                 </svg>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };