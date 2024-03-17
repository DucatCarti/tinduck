import React, {MouseEventHandler, ReactNode} from "react"

interface ButtonProps {
  children: ReactNode
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} text-2xl py-[15px] px-[50px] text-[#535bf2] font-bold rounded-full transition-all ease-in cursor-pointer shadow-[1px_2px_6px_-1px_rgba(0,0,0,0.4)] disabled:cursor-not-allowed disabled:text-slate-400`}
    >
      {children}
    </button>
  )
}

export default Button
