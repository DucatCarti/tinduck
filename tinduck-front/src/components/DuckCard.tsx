import React from "react"
import {Link} from "react-router-dom"
import {UserProfile} from "../types/UserData.ts"

interface DuckCardProps {
  profile: UserProfile | undefined
  isLoading: boolean
}

export const DuckCard: React.FC<DuckCardProps> = ({profile, isLoading}) => {
  return (
    <div className="w-[235px] mx-auto">
      <Link
        draggable={false}
        to={`/duck/${profile?.id}`}
        state={{profile, isOffer: true}}
      >
        <div className="transition-all ease-in hover:scale-[1.015] relative w-[225px] h-[330px] truncate rounded-[20px] shadow-[2px_3px_5px_0px_rgba(0,0,0,0.3)]">
          {profile?.images.length && !isLoading && (
            <img
              className={`w-auto h-full object-cover ${(!profile?.images || isLoading) && "loading"}`}
              src={profile?.images?.[0].url}
              alt=""
            />
          )}

          <div
            className={`${!profile?.name || isLoading ? "loading w-full bottom-[0px] left-[0px]" : "bottom-[10px] left-[15px]"} absolute bg-[#535bf2] rounded-[10px] py-[3px] px-[14px] text-xl font-bold text-white`}
          >
            {!isLoading && (
              <p>
                {profile?.name} {profile?.name && profile?.age && ", "}
                {profile?.age}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
