import {useEffect, useRef, useState} from "react"

export function useOnClickOutside(isInitialValue: boolean) {
  const [isShow, setIsShow] = useState<boolean>(isInitialValue)
  const ref = useRef<HTMLDivElement>(null)
  const listener = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsShow(false)
    }
  }
  useEffect(() => {
    document.addEventListener("click", listener, true)
    return () => {
      document.removeEventListener("click", listener, true)
    }
  })
  return {ref, isShow, setIsShow}
}
