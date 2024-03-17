import React from "react"
import {GiPlasticDuck} from "react-icons/gi"
import Button from "../components/ui/Button.tsx"
import {Link} from "react-router-dom"

export const ErrorPage: React.FC = () => {
  return (
    <div
      className={
        "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
      }
    >
      <GiPlasticDuck className="my-[20px]" size={"100px"} color={"#535bf2"} />
      <div className="text-2xl font-black text-[#535bf2]">
        Your Duck is not found :c
      </div>
      <div className="my-[15px] text-5xl font-black text-[#535bf2]">404</div>
      <Link className="mt-[20px]" to={"/"}>
        <Button>GO HOME</Button>
      </Link>
    </div>
  )
}
