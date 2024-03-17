import React from "react"
import {Control, Controller, WatchInternal} from "react-hook-form"
import {
  PiGenderFemaleLight,
  PiGenderIntersexLight,
  PiGenderMaleLight,
} from "react-icons/pi"
import {UserProfile} from "../../types/UserData.ts"

interface SelectorGenderPreferenceProps {
  control: Control
  watch: WatchInternal<UserProfile>
  defaultValue?: string
}

export const SelectorGenderPreference: React.FC<
  SelectorGenderPreferenceProps
> = ({control, watch, defaultValue}) => {
  return (
    <>
      <div className="flex flex-row items-center justify-around gap-[30px]">
        <Controller
          control={control}
          name={"genderPreference"}
          defaultValue={defaultValue}
          rules={{required: "Выбирете пол!"}}
          render={({field}) => (
            <button
              onClick={(e) => {
                field.onChange("man")
                e.preventDefault()
              }}
              className={`rounded-full p-[10px] shadow-[1px_2px_6px_-1px_rgba(0,0,0,0.4)] ${watch("genderPreference") === "man" && "shadow-[0px_0px_7px_-0px_#535bf2] ease-in transition-shadow duration-[200ms]"}`}
            >
              <PiGenderFemaleLight size={"40px"} color={"#535bf2"} />
            </button>
          )}
        />
        <Controller
          control={control}
          name={"genderPreference"}
          defaultValue={defaultValue}
          rules={{required: "Выбирете пол!"}}
          render={({field}) => (
            <button
              onClick={(e) => {
                field.onChange("woman")
                e.preventDefault()
              }}
              className={`rounded-full p-[10px] shadow-[1px_2px_6px_-1px_rgba(0,0,0,0.4)] ${watch("genderPreference") === "woman" && "shadow-[0px_0px_7px_-0px_#ed53f2] ease-in transition-shadow duration-[200ms]"}`}
            >
              <PiGenderMaleLight size={"40px"} color={"#ed53f2"} />
            </button>
          )}
        />
        <Controller
          control={control}
          name={"genderPreference"}
          defaultValue={defaultValue}
          rules={{required: "Выбирете пол!"}}
          render={({field}) => (
            <button
              onClick={(e) => {
                field.onChange("all")
                e.preventDefault()
              }}
              className={`rounded-full p-[10px] shadow-[1px_2px_6px_-1px_rgba(0,0,0,0.4)] ${watch("genderPreference") === "all" && "shadow-[0px_0px_7px_-0px_#8d53f2] ease-in transition-shadow duration-[200ms]"}`}
            >
              <PiGenderIntersexLight size={"40px"} color={"#8d53f2"} />
            </button>
          )}
        />
      </div>
    </>
  )
}
