import React from "react"

interface ErrorMessageProps {
  children: string
  className?: string
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  children,
  className,
}) => {
  return <p className={`${className} text-rose-700 text-xs`}>{children}</p>
}
