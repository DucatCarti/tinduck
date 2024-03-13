import {GiPlasticDuck} from "react-icons/gi"
import React from "react"

interface SpinnerProps {
  absolute?: boolean
}

export const Spinner: React.FC<SpinnerProps> = ({absolute = true}) => {
  return (
    <div
      className={` ${absolute ? "spinner-container" : ""} flex flex-col gap-[20px]`}
    >
      <GiPlasticDuck
        size={"100px"}
        color={"#535bf2"}
        className="spinner-icon"
      />
    </div>
  )
}
