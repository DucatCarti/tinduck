import React from "react"
import {IoClose} from "react-icons/io5"
import {FaHeart} from "react-icons/fa6"
import {Navigate, useLocation, useNavigate} from "react-router-dom"
import {Image} from "../types/UserData.ts"
import {$axios} from "../api/axios.ts"

export const DuckDetail: React.FC = () => {
  const location = useLocation()
  const profile = location.state?.profile
  const isOffer = location.state?.isOffer
  const navigate = useNavigate()
  const likeOffer = async () => {
    await $axios
      .post(`offer/like/${profile?.id}`)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    navigate("/")
  }
  const DisLikeOffer = () => {
    navigate("/")
  }
  return (
    <>
      {profile ? (
        <div className="relative">
          <div>
            <div className="h-[200px] w-full overflow-hidden rounded-t-[20px]">
              <img
                className="w-full h-full object-cover"
                src={profile.images[0].url}
                alt="photo"
              />
            </div>
          </div>
          <div className="mx-[30px] my-[30px] flex flex-col gap-[15px]">
            <div>
              <p className="text-xl font-semibold">
                {profile?.name} {profile.name && profile.age && ", "}{" "}
                {profile?.age}
              </p>
              <p className="text-sm text-slate-600 font-regular">Плавец</p>
            </div>
            <div>
              <p className="text-s font-semibold"> Location</p>
              <p className="text-sm text-slate-600 font-regular">
                {profile.location}
              </p>
            </div>
          </div>
          <div className="mx-[30px]">
            {isOffer && (
              <div className="flex flex-row items-center justify-around bg-[#535bf2] py-[12px] rounded-[20px]">
                <div
                  onClick={() => DisLikeOffer()}
                  className="flex flex-1 justify-center transition-all ease-in hover:scale-125 cursor-pointer"
                >
                  <IoClose color={"white"} size={"40px"}></IoClose>
                </div>
                <div
                  onClick={() => likeOffer()}
                  className="flex flex-1 justify-center transition-all ease-in hover:scale-125 cursor-pointer"
                >
                  <FaHeart color={"white"} size={"27px"}></FaHeart>
                </div>
              </div>
            )}
          </div>
          <div className="mx-[30px] my-[30px]">
            <h3 className="font-bold text-xl my-[10px]">About</h3>
            <p>{profile?.about}</p>
          </div>
          <div className="mx-[30px]">
            <h3 className="font-bold text-xl my-[15px] text-center">Gallery</h3>
            <div className="flex flex-wrap gap-[10px] items-center justify-center">
              {profile.images.map((image: Image) => (
                <div
                  key={image.id}
                  className="w-[200px] h-[200px] overflow-hidden"
                >
                  <img
                    className="w-auto h-full object-cover"
                    src={image.url}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  )
}
