import React from "react"
import {IoPerson} from "react-icons/io5"
import {FaHeart} from "react-icons/fa6"
import {AiFillMessage} from "react-icons/ai"
import {FaPlay} from "react-icons/fa"
import {NavLink} from "react-router-dom"

export const FooterNav: React.FC = () => {
  return (
    <div className="bg-white h-[70px] flex flex-row items-center justify-around w-full">
      <div className="w-full h-full flex item-center justify-center flex-1">
        <NavLink className="flex w-full items-center justify-center" to={"/"}>
          <FaPlay size="25px" />
        </NavLink>
      </div>
      <div className="w-full h-full flex item-center justify-center flex-1">
        <NavLink
          className="flex w-full items-center justify-center"
          to={"/like"}
        >
          <FaHeart size={"25px"} />
        </NavLink>
      </div>
      <div className="w-full h-full flex item-center justify-center flex-1">
        <NavLink
          className="flex w-full items-center justify-center"
          to={"/messages"}
        >
          <AiFillMessage size={"25px"} />
        </NavLink>
      </div>
      <div className="w-full h-full flex item-center justify-center flex-1">
        <NavLink
          className="flex w-full items-center justify-center"
          to={"/profile"}
        >
          <IoPerson size={"25px"} />
        </NavLink>
      </div>
    </div>
  )
}
