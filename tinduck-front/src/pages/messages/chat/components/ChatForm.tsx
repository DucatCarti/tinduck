import React from "react"
import {Input} from "../../../../components/ui/Input.tsx"
import {IoMdSend} from "react-icons/io"
import {InputChangeEvent} from "../../../../types/Events.ts"

interface InputChatProps {
  sendMessage: (e: React.MouseEvent<HTMLButtonElement>) => void
  onChange: (event: InputChangeEvent) => void
  message: string
}

export const ChatForm: React.FC<InputChatProps> = ({
  sendMessage,
  message,
  onChange,
}) => {
  const onChangeInput = (e: InputChangeEvent) => {
    const textarea = e.target as HTMLTextAreaElement
    if (textarea.scrollHeight < 150) {
      textarea.style.height = ""
      textarea.style.height = `${textarea.scrollHeight + 2}px`
    }
    onChange(e)
  }
  return (
    <div className={"w-full px-[15px] py-[5px] relative"}>
      <div className={"flex flex-row gap-[10px]"}>
        <Input
          className={`h-[46px] pr-[50px]`}
          type={"textarea"}
          value={message}
          onChange={(e) => onChangeInput(e)}
          label={"Сообщение"}
        ></Input>
        <button
          onClick={(e) => sendMessage(e)}
          className={
            "absolute bottom-[5px] right-[20px] p-[10px] flex items-center justify-center"
          }
        >
          <IoMdSend size={"26px"} />
        </button>
      </div>
    </div>
  )
}
