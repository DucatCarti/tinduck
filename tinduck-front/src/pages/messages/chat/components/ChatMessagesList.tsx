import React, {useEffect, useMemo} from "react"
import {Message, UserProfile} from "../../../../types/UserData.ts"
import {Spinner} from "../../../../components/ui/Spinner.tsx"
import {ErrorMessage} from "../../../../components/ui/ErrorMessage.tsx"

interface ChatMessagesListProps {
  messages: Message[]
  isLoading: boolean
  senderProfile: UserProfile | null
  errorMessage: string
}

export const ChatMessagesList: React.FC<ChatMessagesListProps> = ({
  messages,
  senderProfile,
  isLoading,
  errorMessage,
}) => {
  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
    })
  }, [messages])
  const formatDate = useMemo(
    () => (dateString: string) => {
      const options: Intl.DateTimeFormatOptions = {
        minute: "2-digit",
        hour: "2-digit",
        month: "short",
        day: "numeric",
        hour12: false,
      }
      return new Date(dateString).toLocaleDateString("en-US", options)
    },
    [],
  )
  return (
    <div className="my-[65px] w-full p-[30px] relative">
      <div className="flex flex-col gap-[15px]">
        <ErrorMessage className="absolute bottom-[10px]">
          {errorMessage}
        </ErrorMessage>
        {messages?.length ? (
          messages?.map((message: Message) => (
            <div
              key={message.id}
              className={`break-all relative pb-[25px] py-[5px] px-[15px] rounded-[18px] min-w-[110px] max-w-[300px] ${message.senderId === senderProfile?.id ? "self-end bg-[#535bf2] text-white" : "self-start bg-white"} shadow-[1px_2px_6px_-1px_rgba(0,0,0,0.4)]`}
            >
              <p> {message.text}</p>
              <p className="text-xs absolute text-slate-400 bottom-[5px] right-[15px]">
                {formatDate(message?.createdAt)}
              </p>
            </div>
          ))
        ) : isLoading ? (
          <Spinner></Spinner>
        ) : (
          <div className="text-slate-400 text-center absolute bottom-[10px]">
            Вы пока не общались. Начните диалог первым!
          </div>
        )}
      </div>
    </div>
  )
}
