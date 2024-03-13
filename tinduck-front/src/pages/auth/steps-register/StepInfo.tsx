import React from "react"
import {Input} from "../../../components/ui/Input.tsx"
import {PiGenderFemaleLight, PiGenderMaleLight} from "react-icons/pi"
import Button from "../../../components/ui/Button.tsx"
import {Control, Controller, FieldErrors, WatchInternal} from "react-hook-form"
import {UserProfile} from "../../../types/UserData.ts"
import {InputChangeEvent} from "../../../types/Events.ts"

interface StepInfoProps {
  control: Control
  errors: FieldErrors
  watch: WatchInternal<UserProfile>
  stepRegisterBack: () => void
}

export const StepInfo: React.FC<StepInfoProps> = ({
  stepRegisterBack,
  errors,
  control,
  watch,
}) => {
  console.log(errors)

  return (
    <>
      <Controller
        control={control}
        name={"name"}
        rules={{required: "Поле является обязательным!"}}
        render={({field}) => (
          <Input
            errorMessage={errors?.name?.message as string}
            onChange={(e: InputChangeEvent) => field.onChange(e)}
            value={field.value}
            type={"text"}
            label={"Имя"}
          ></Input>
        )}
      />
      <Controller
        control={control}
        name={"age"}
        rules={{
          required: "Поле является обязательным!",
          maxLength: {value: 2, message: "Вы уверены что вы такой старый?)"},
          pattern: /^\d{1,2}$/,
        }}
        render={({field}) => (
          <Input
            errorMessage={errors?.age?.message as string}
            onChange={(e: InputChangeEvent) => field.onChange(e)}
            value={field.value}
            type={"number"}
            label={"Возраст"}
          ></Input>
        )}
      />
      <div className={"flex flex-row items-center justify-around gap-[30px]"}>
        <Controller
          control={control}
          name={"gender"}
          rules={{required: "Выбирете пол!"}}
          render={({field}) => (
            <button
              onClick={(e) => {
                field.onChange("man")
                e.preventDefault()
              }}
              className={`rounded-full p-[10px] shadow-[1px_2px_6px_-1px_rgba(0,0,0,0.4)] ${watch("gender") === "man" && "shadow-[0px_0px_7px_-0px_#535bf2] ease-in transition-shadow duration-[200ms]"}`}
            >
              <PiGenderFemaleLight size={"40px"} color={"#535bf2"} />
            </button>
          )}
        />
        <Controller
          control={control}
          name={"gender"}
          rules={{required: "Выбирете пол!"}}
          render={({field}) => (
            <button
              onClick={(e) => {
                field.onChange("woman")
                e.preventDefault()
              }}
              className={`rounded-full p-[10px] shadow-[1px_2px_6px_-1px_rgba(0,0,0,0.4)] ${watch("gender") === "woman" && "shadow-[0px_0px_7px_-0px_#535bf2] ease-in transition-shadow duration-[200ms]"}`}
            >
              <PiGenderMaleLight size={"40px"} color={"#ed53f2"} />
            </button>
          )}
        />
      </div>
      {errors?.age && (
        <p className={"text-rose-700 text-xs"}>
          {errors?.gender?.message as string}
        </p>
      )}
      <div className={"flex flex-col"}>
        <Button className={"w-full"}>Продолжить</Button>
        <button
          onClick={() => stepRegisterBack()}
          className={"text-[#535bf2] font-bold mt-[12px] text-sm"}
        >
          Назад
        </button>
      </div>
    </>
  )
}
