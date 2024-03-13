import React from "react"
import {UserProfile} from "../../types/UserData.ts"
import {Link} from "react-router-dom"

interface DuckCardChatProps {
  profile: UserProfile
}

export const DuckCardChat: React.FC<DuckCardChatProps> = ({profile}) => {
  return (
    <Link to={`/messages/${profile?.id}`} state={{profile}}>
      <div
        className={
          "flex flex-row gap-[30px] w-full overflow-hidden px-[22px] py-[12px] relative rounded-[15px] shadow-[2px_3px_5px_0px_rgba(0,0,0,0.3)] cursor-pointer"
        }
      >
        <div
          className={
            "rounded-full min-w-[70px] w-[70px] min-h-[70px] h-[70px] overflow-hidden"
          }
        >
          <img
            src={profile?.images?.[0]?.url}
            alt=""
            className={"bg-black w-full h-full object-cover"}
          />
          S
        </div>
        <div className={"flex flex-col justify-between"}>
          <div>
            <p
              className={`bg-[#535bf2] rounded-[10px] py-[3px] px-[14px] text-xl font-bold text-white inline-block`}
            >
              {profile?.name}
            </p>
          </div>
          <div className={"flex flex-row"}>
            <p className={"pr-[5px] font-bold"}>
              {profile?.lastMessage?.senderName + ":"}
            </p>
            <p className={"line-clamp-1 break-all"}>
              {profile?.lastMessage?.text}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
