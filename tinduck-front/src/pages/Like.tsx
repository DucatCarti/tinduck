import React, {useEffect, useState} from "react"
import {$axios} from "../api/axios.ts"
import {UserProfile} from "../types/UserData.ts"
import {DuckCardMini} from "../components/DuckCardMini.tsx"
import {Spinner} from "../components/ui/Spinner.tsx"

export const Like: React.FC = () => {
  useEffect(() => {
    getLikedBy()
  }, [])

  const [likedBy, setLikedBy] = useState<UserProfile[] | []>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const getLikedBy = async () => {
    setIsLoading(true)
    await $axios
      .get("offer/like")
      .then((res) => {
        setLikedBy(res.data.likedByUsers)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  return (
    <div className="py-[50px]">
      <div className="flex flex-row flex-wrap justify-center gap-[40px]">
        {likedBy?.length ? (
          likedBy?.map((profile) => (
            <div key={profile?.id}>
              <DuckCardMini profile={profile}></DuckCardMini>
            </div>
          ))
        ) : isLoading ? (
          <Spinner></Spinner>
        ) : (
          <div>
            <p className="text-slate-400 text-xl text-center">
              Вы пока никого не лайкнули :c
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
