import React, {useEffect, useMemo, useState} from "react"
import {DuckCardChat} from "./DuckCardChat.tsx"
import {io} from "socket.io-client"
import {useAppDispatch, useAppSelector} from "../../hooks/store.ts"
import {getProfile} from "../../store/slice/auth.ts"
import {UserProfile} from "../../types/UserData.ts"
import {Spinner} from "../../components/ui/Spinner.tsx"
import {BASE_URL} from "../../api/axios.ts"

export const ChatList: React.FC = () => {
  const socket = useMemo(() => io(`${BASE_URL}`), [])
  const profile = useAppSelector((state) => state.auth.profile)
  const [chats, setChats] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const getAllChats = () => {
    setIsLoading(true)
    if (profile?.id) {
      socket.emit("getAllChats", {senderId: profile?.id})
    }
  }
  useEffect(() => {
    dispatch(getProfile())

    socket.on("responseAllChats", (data) => {
      setIsLoading(false)
      setChats(data)
    })
  }, [])
  useEffect(() => {
    getAllChats()
    socket.on("updateAllChats", () => {
      if (profile?.id) {
        getAllChats()
      } else {
        dispatch(getProfile())
      }
    })
  }, [profile?.id])
  return (
    <div className="flex flex-col min-w-full min-h-full h-full w-full">
      {chats?.length ? (
        <>
          {chats?.map((profile: UserProfile) => (
            <div key={profile?.id}>
              <DuckCardChat profile={profile}></DuckCardChat>
            </div>
          ))}
        </>
      ) : isLoading ? (
        <Spinner></Spinner>
      ) : (
        <div>
          <p className="text-slate-400 text-xl text-center py-[50px]">
            Вы пока нискем не общались :c
          </p>
        </div>
      )}
    </div>
  )
}
