import { Title } from "@/6-shared/ui/Title/Title";
import { IChatMessage } from "../model/chat.model";
import { Description } from "@/6-shared/ui/Description/Description";
import Avatar from "@/6-shared/ui/Avatar/Avatar";
import { PLATFORM_PAGES } from "@/6-shared/config/pages-url.config";
import Link from "next/link";
import TextMuted from "@/6-shared/ui/TextMuted/TextMuted";
import { formatTime } from "@/6-shared/lib/utils";
import { CheckCheck } from "lucide-react";
import { ICON_SIZE } from "@/6-shared/constants/constants";
import { useProfile } from "@/5-entities/user";
import { useMemo } from "react";

type Props = {
  message: IChatMessage;
};

export const ChatMessage = ({ message }: Props) => {
  const { profile } = useProfile();

  if (!message || !message.sender_details) {
    console.warn("Invalid message or sender_details:", message);
    return null;
  }

  const senderDetails = message.sender_details;

  const isMyMessage = useMemo(() => {
    return profile?.id === senderDetails.id;
  }, [profile?.id, senderDetails.id]);

  // const buyer = chat.buyer_details
  // const dealer = chat.dealer_details

  console.log(message);

  // const { myChat, interlocutorChat } = useMemo(() => {
  //   if (profile?.id === buyer.id) {
  //     return {
  //       myChat: { ...buyer },
  //       interlocutorChat: { ...dealer },
  //     }
  //   } else {
  //     return {
  //       myChat: { ...dealer },
  //       interlocutorChat: { ...buyer },
  //     }
  //   }
  // }, [profile?.id, buyer, dealer])

  return (
    <div
      className={`chat-message ${isMyMessage ? "chat-message--my" : "chat-message--other"}`}
    >
      <div className="chat-message__wrapper">
        <div className="chat-message__container">
          <div className="chat-message__content">
            {!isMyMessage && (
              <Avatar
                link={`${PLATFORM_PAGES.DEALERS}/${senderDetails.id}`}
                username={senderDetails.username}
                avatar={senderDetails.image_url}
              />
            )}

            <div className="chat-message__info">
              {!isMyMessage && (
                <Link href={`${PLATFORM_PAGES.DEALERS}/${senderDetails.id}`}>
                  <div className="chat-message__title">
                    <Title
                      size="h4"
                      color="black"
                      fontSize="15px"
                      fontWeight="500"
                      fontFamily="geist"
                    >
                      {senderDetails.username}
                    </Title>
                  </div>
                </Link>
              )}

              <div className="chat-message__footer">
                <Description fontSize="1.6rem">{message?.content}</Description>
                <div className="chat-message__footer-container">
                  <TextMuted>
                    {message.timestamp && formatTime(message.timestamp)}
                  </TextMuted>
                  {isMyMessage && <CheckCheck size={ICON_SIZE} />}
                </div>
              </div>
            </div>

            {isMyMessage && (
              <Avatar
                avatar={senderDetails.image_url}
                link={`${PLATFORM_PAGES.DEALERS}/${senderDetails.id}`}
                username={senderDetails.username}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
