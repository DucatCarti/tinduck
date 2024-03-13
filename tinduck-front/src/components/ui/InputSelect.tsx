import React, {useState} from "react"
import {Input} from "./Input.tsx"
import {IoClose} from "react-icons/io5"
import {useOnClickOutside} from "../../hooks/useOnClickOutside.ts"
import {InputChangeEvent} from "../../types/Events.ts"

export interface Option {
  id: number
  name: string
}

interface InputSelectProps {
  label: string
  name?: string
  type?: string
  value?: string
  errorMessage?: string
  options: Option[]
  onSelect: (option: Option) => void
  resetValue: () => void
}

export const InputSelect: React.FC<InputSelectProps> = ({
  label,
  name,
  type,
  onSelect,
  value,
  options,
  resetValue,
  errorMessage,
}) => {
  const [valueSelect, setValueSelect] = useState<string>("")
  const [searchOptions, setSearchOptions] = useState<Option[]>([])
  const {isShow, setIsShow, ref} = useOnClickOutside(false)

  const clickOption = (option: Option) => {
    onSelect(option)
    setValueSelect(option.name)
    setIsShow(false)
  }
  const searchingOptions = (e: InputChangeEvent) => {
    setValueSelect(e.target.value)
    const value = e.target.value
    const result = options.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase()),
    )
    setSearchOptions(result)
  }
  const resetSelectValue = () => {
    setValueSelect("")
    setSearchOptions(options)
    resetValue()
  }
  return (
    <div ref={ref} className={"relative w-full"}>
      {!value ? (
        <Input
          errorMessage={errorMessage}
          label={label}
          name={name}
          type={type}
          onFocus={() => {
            setIsShow(true)
          }}
          onChange={searchingOptions}
          value={valueSelect}
        ></Input>
      ) : (
        <div
          className={
            "bg-white flex flex-row gap-[10px] items-center p-[11px] text-s shadow-[1px_2px_6px_-1px_rgba(0,0,0,0.4)] rounded-[20px]"
          }
        >
          <p className={"px-[10px] line-clamp-1"}>{valueSelect || value}</p>
          <IoClose
            onClick={resetSelectValue}
            className={"transition-all ease-in hover:scale-125 cursor-pointer"}
            size={"20px"}
          />
        </div>
      )}
      {isShow && (
        <div
          className={
            "absolute z-10 overflow-scroll max-h-[250px] w-full top-[50px] left-[0px] bg-white rounded-[20px] shadow-[1px_2px_6px_-1px_rgba(0,0,0,0.4)]"
          }
        >
          <ul className={"flex flex-col py-[15px]"}>
            {searchOptions.length >= 1
              ? searchOptions.map((option) => (
                  <li
                    className={
                      "px-[15px] py-[10px] cursor-pointer hover:bg-slate-100"
                    }
                    onClick={() => clickOption(option)}
                    key={option.name}
                  >
                    {option.name}
                  </li>
                ))
              : options.map((option) => (
                  <li
                    className={
                      "px-[15px] py-[10px] cursor-pointer hover:bg-slate-100"
                    }
                    onClick={() => clickOption(option)}
                    key={option.name}
                  >
                    {option.name}
                  </li>
                ))}
          </ul>
        </div>
      )}
    </div>
  )
}
