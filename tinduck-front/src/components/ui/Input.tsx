import React, {useState} from "react"
import {InputChangeEvent} from "../../types/Events.ts"

interface InputProps {
  className?: string
  label?: string
  name?: string
  type?: string
  onChange: (event: InputChangeEvent) => void
  value: string | undefined
  onFocus?: () => void
  onBlur?: () => void
  errorMessage?: string | undefined
  cols?: number | undefined
  rows?: number | undefined
}

export const Input: React.FC<InputProps> = ({
  className,
  label,
  name,
  type = "text",
  onChange,
  value,
  onFocus,
  onBlur,
  errorMessage,
  cols = 20,
  rows = 10,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const handleInputChange = (event: InputChangeEvent) => {
    onChange(event)
  }
  const handleFocused = () => {
    setIsFocused(true)
    if (onFocus) {
      onFocus()
    }
  }
  const handleBlur = () => {
    setIsFocused(false)
    if (onBlur) {
      onBlur()
    }
  }
  return (
    <>
      <label className={"relative block w-full"} htmlFor={name}>
        <p
          className={
            "absolute transition-all duration-500 ease-in-out pointer-events-none " +
            (isFocused || value
              ? "top-[-23px] left-[15px] text-sm text-[#535bf2] font-bold"
              : "text-gray-400 text-s top-[10px] left-[22px]")
          }
        >
          {label}
        </p>
        {type === "textarea" ? (
          <>
            <div
              className={
                "flex items-center shadow-custom rounded-[20px] overflow-hidden focus:outline-none focus-within:shadow-[0px_0px_7px_-0px_#535bf2] ease-in transition-shadow duration-[200ms]"
              }
            >
              <textarea
                name={name}
                cols={cols}
                rows={rows}
                className={`${className} w-full bg-white text-black text-lg py-[7px] px-[20px]`}
                onChange={handleInputChange}
                value={value}
                onFocus={() => handleFocused()}
                onBlur={() => handleBlur()}
              >
                {value}
              </textarea>
            </div>
          </>
        ) : (
          <>
            <div
              className={`${className} bg-white w-full text-black text-base px-[24px] py-[11px] rounded-[20px] shadow-custom focus:outline-none focus-within:shadow-[0px_0px_7px_-0px_#535bf2] ease-in transition-shadow duration-[200ms]`}
            >
              <input
                className={"min-w-full min-h-full w-full h-full"}
                onChange={handleInputChange}
                value={value}
                type={type}
                name={name}
                onFocus={() => handleFocused()}
                onBlur={() => handleBlur()}
              />
            </div>
          </>
        )}
        <p
          className={
            "top-[50px] right-[10px] text-end absolute text-rose-700 text-xs"
          }
        >
          {errorMessage}
        </p>
      </label>
    </>
  )
}
