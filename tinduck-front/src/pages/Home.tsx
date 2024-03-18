import React, {useEffect, useRef, useState} from "react"
import {DuckCard} from "../components/DuckCard.tsx"
import {$axios} from "../api/axios.ts"
import {useAppDispatch, useAppSelector} from "../hooks/store.ts"
import {Gender, UserProfile} from "../types/UserData.ts"
import {getProfile} from "../store/slice/auth.ts"
import TinderCard from "react-tinder-card"
import {Spinner} from "../components/ui/Spinner.tsx"
import {IoClose} from "react-icons/io5"
import {FaHeart} from "react-icons/fa6"

type Direction = "left" | "right" | "up" | "down"
interface TinderCardElement {
  restoreCard: () => Promise<void>
  swipe(dir?: Direction): Promise<void>
}

export const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector((state) => state.auth.profile)
  useEffect(() => {
    if (!profile) {
      dispatch(getProfile())
    }
    getOffer()
  }, [])

  const [genderPreference, setGenderPreference] = useState<Gender | undefined>()
  useEffect(() => {
    setGenderPreference(profile?.genderPreference)
  }, [profile?.genderPreference])

  const [offerUser, setOfferUser] = useState<UserProfile | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>("")
  const getOffer = async () => {
    setIsLoading(true)
    await $axios
      .post("/offer/", {genderPreference})
      .then((res) => {
        if (res.status === 200) {
          setOfferUser(res?.data)
          setErrorMessage("")
        }
        if (res.data?.message) {
          setErrorMessage(res.data?.message)
        }
        tinderCardRef.current?.restoreCard()
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setErrorMessage("Ошибка получения карточки пользователя")
      })
  }
  const likeOffer = async () => {
    await $axios
      .post(`offer/like/${offerUser?.id}`)
      .then((res) => {
        if (res.status !== 200 && res.data?.message) {
          setErrorMessage(res.data?.message || "Ошибка лайка")
        }
      })
      .catch((err) => {
        console.log(err)
        setErrorMessage("Ошибка лайка")
      })
    getOffer()
  }
  const DisLikeOffer = () => {
    getOffer()
  }

  const tinderCardRef = useRef<TinderCardElement>(null)
  const swiped = async (dir: string) => {
    if (dir === "left") {
      DisLikeOffer()
    }
    if (dir === "right") {
      likeOffer()
    }
  }

  return (
    <div className="flex items-center justify-center h-full relative">
      <div
        className={`z-10 flex flex-col items-center ${isLoading ? "pointer-events-none" : ""}`}
      >
        <TinderCard
          ref={tinderCardRef}
          onSwipe={(dir) => swiped(dir)}
          preventSwipe={["down", "up"]}
          swipeRequirementType={"position"}
          swipeThreshold={2}
        >
          <DuckCard isLoading={isLoading} profile={offerUser}></DuckCard>
        </TinderCard>
        <div
          className={`${isLoading && "pointer-events-none"} flex flex-row w-full items-center justify-center gap-[20px] mt-[12px]`}
        >
          <div onClick={() => swiped("left")}>
            <IoClose
              className="transition-all ease-in hover:scale-125 cursor-pointer p-[5px] shadow-[1px_2px_6px_-1px_rgba(0,0,0,0.4)] rounded-[100px]"
              color={isLoading ? "gray" : "black"}
              size={"35px"}
            />
          </div>
          <div onClick={() => swiped("right")}>
            <FaHeart
              className="transition-all ease-in hover:scale-125 cursor-pointer p-[13px] shadow-[1px_2px_6px_-1px_rgba(0,0,0,0.4)] rounded-[100px]"
              color={isLoading ? "gray" : "red"}
              size={"50px"}
            />
          </div>
        </div>
        {errorMessage && (
          <div className={"my-[15px] text-rose-700 text-sm"}>
            {errorMessage}
          </div>
        )}
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {isLoading && <Spinner></Spinner>}
      </div>
    </div>
  )
}
