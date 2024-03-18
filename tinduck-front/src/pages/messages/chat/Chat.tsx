import React, {useEffect, useMemo, useState} from "react"
import {io} from "socket.io-client"
import {useLocation} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../../../hooks/store.ts"
import {getProfile} from "../../../store/slice/auth.ts"
import {ChatForm} from "./components/ChatForm.tsx"
import {ChatHeader} from "./components/ChatHeader.tsx"
import {ChatMessagesList} from "./components/ChatMessagesList.tsx"
import {BASE_URL} from "../../../api/axios.ts"

export const Chat: React.FC = () => {
  const location = useLocation()
  const receiverProfile = location.state?.profile
  const senderProfile = useAppSelector((state) => state.auth?.profile)

  const dispatch = useAppDispatch()
  const [messages, setMessages] = useState([])
  const [errorMessage, setErrorMessage] = useState<string>("")
  useEffect(() => {
    dispatch(getProfile())
    socket.on("getMessages", (data) => {
      if (data?.messages) {
        setMessages(data.messages)
      }
      if (data?.message) {
        setErrorMessage(data.message)
      }
      setIsLoading(false)
    })
    socket.on("responseMessages", (data) => {
      if (data?.messages) {
        setMessages(data.messages)
      }
      if (data?.message) {
        setErrorMessage(data.message)
      }
    })
  }, [])
  useEffect(() => {
    getMessages()
  }, [senderProfile?.id])

  const socket = useMemo(() => io(`${BASE_URL}`), [])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const getMessages = () => {
    if (senderProfile?.id && receiverProfile?.id) {
      socket.emit("getMessages", {
        senderId: senderProfile?.id,
        receiverId: receiverProfile?.id,
      })
      setIsLoading(true)
    }
  }
  const [message, setMessage] = useState<string>("")
  const sendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (message) {
      socket.emit("sendMessage", {
        message: message,
        senderId: senderProfile?.id,
        receiverId: receiverProfile?.id,
      })
      setMessage("")
    }
  }

  return (
    <div className="h-auto w-full">
      <div className="flex flex-col items-center justify-between w-full min-w-full h-full min-h-full">
        <ChatHeader receiverProfile={receiverProfile}></ChatHeader>
        <ChatMessagesList
          errorMessage={errorMessage}
          messages={messages}
          senderProfile={senderProfile}
          isLoading={isLoading}
        ></ChatMessagesList>
        <div className="z-10 fixed bottom-[70px] pb-[5px] w-full bg-white container-app">
          <ChatForm
            sendMessage={(e) => sendMessage(e)}
            message={message}
            onChange={(e) => setMessage(e.target.value)}
          ></ChatForm>
        </div>
      </div>
    </div>
  )
}
