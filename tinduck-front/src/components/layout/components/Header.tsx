import React from "react"
import {Link, useLocation, useNavigate} from "react-router-dom"
import {IoChevronBack} from "react-icons/io5"
import {GiPlasticDuck} from "react-icons/gi"
import {IoMdExit} from "react-icons/io"

export const Header: React.FC = () => {
  const {pathname} = useLocation()

  const navigate = useNavigate()

  const exit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div className={"z-20 w-full fixed top-[0px] container-app"}>
      <div className="bg-white relative w-full text-[35px] text-center py-[15px] mx-auto w-full font-black text-[#535bf2] flex flex-row items-center rounded-b-sm overflow-hidden">
        {pathname !== "/" && (
          <Link
            to={"/"}
            className="absolute top-[25px] mx-[20px] max-w-[40px] max-h-[40px] border border-[#535bf2] transition-all ease-in hover:scale-125 cursor-pointer p-[5px] bg-white/30 rounded-[100px] flex items-center justify-center"
          >
            <IoChevronBack
              className="ml-[-2px]"
              size={"20px"}
              color={"#535bf2"}
            />
          </Link>
        )}
        <div className="flex items-center gap-[5px] m-auto">
          <p>TinDuck</p>
          <div>
            <GiPlasticDuck className="mt-[-20px]" size={"35px"} />
          </div>
        </div>
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => exit(e)}
          className="absolute top-[25px] right-[0px] mx-[20px]"
        >
          <IoMdExit size={"30px"} color={"#535bf2"} />
        </button>
      </div>
    </div>
  )
}
