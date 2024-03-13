import React from "react"
import {Link} from "react-router-dom"
import {UserProfile} from "../../../../types/UserData.ts"

interface HeaderChatProps {
  receiverProfile: UserProfile
}

export const ChatHeader: React.FC<HeaderChatProps> = ({receiverProfile}) => {
  return (
    <div className={"z-10 fixed top-[75px] w-full bg-white container-app"}>
      <div
        className={
          "flex flex-row items-center gap-[30px] w-full px-[25px] my-[10px] relative"
        }
      >
        <div
          className={"h-[60px] w-[60px] rounded-full overflow-hidden bg-black"}
        >
          <Link
            to={`/duck/${receiverProfile?.id}`}
            state={{profile: receiverProfile}}
          >
            <img
              className={"w-full h-full"}
              src={receiverProfile?.images?.[0]?.url || "/duck.png"}
              alt=""
            />
          </Link>
        </div>
        <div>
          <div
            className={`absolute bottom-[0px] left-[75px] bg-[#535bf2] rounded-[10px] py-[3px] px-[14px] text-xl font-bold text-white`}
          >
            {receiverProfile?.name}{" "}
            {receiverProfile?.name && receiverProfile?.age && ", "}
            {receiverProfile?.age}
          </div>
        </div>
      </div>
    </div>
  )
}
