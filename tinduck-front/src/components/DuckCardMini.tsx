import React from "react"
import {AiFillMessage} from "react-icons/ai"
import {UserProfile} from "../types/UserData.ts"
import {Link} from "react-router-dom"

interface DuckCardMiniProps {
  profile: UserProfile
}

export const DuckCardMini: React.FC<DuckCardMiniProps> = ({profile}) => {
  return (
    <div>
      <div className="relative w-[150px] h-[160px]">
        <div className="w-full h-full rounded-[15px] overflow-hidden shadow-[2px_3px_5px_0px_rgba(0,0,0,0.3)]">
          <Link to={`/duck/${profile?.id}`} state={{profile}}>
            <img
              className="w-full h-full object-cover cursor-pointer"
              src={profile?.images?.[0]?.url}
              alt=""
            />
          </Link>
        </div>
        <Link
          to={`/messages/${profile?.id}`}
          state={{profile}}
          className="z-10 cursor-pointer absolute right-[-15px] bottom-[-20px] p-[8px] bg-white rounded-full shadow-[2px_3px_5px_0px_rgba(0,0,0,0.3)]"
        >
          <AiFillMessage size={"30px"} color={"#535bf2"}></AiFillMessage>
        </Link>
        <div>
          <div
            className={`${!profile?.name ? "loading w-full bottom-[0px] left-[0px]" : "bottom-[10px] left-[15px]"} absolute bg-[#535bf2] rounded-[10px] py-[3px] px-[14px] text-xl font-bold text-white`}
          >
            {profile?.name} {profile?.name && profile?.age && ", "}
            {profile?.age}
          </div>
        </div>
      </div>
    </div>
  )
}
