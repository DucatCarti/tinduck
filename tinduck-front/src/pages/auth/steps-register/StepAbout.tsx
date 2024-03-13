import React from "react"
import {Input} from "../../../components/ui/Input.tsx"
import Button from "../../../components/ui/Button.tsx"
import {Control, Controller} from "react-hook-form"
import {InputChangeEvent} from "../../../types/Events.ts"

interface StepAboutProps {
  control: Control
  stepRegisterBack: () => void
}
export const StepAbout: React.FC<StepAboutProps> = ({
  control,
  stepRegisterBack,
}) => {
  return (
    <>
      <Controller
        control={control}
        name={"about"}
        render={({field}) => (
          <Input
            onChange={(e: InputChangeEvent) => field.onChange(e)}
            value={field.value}
            type={"textarea"}
            label={"Расскажите о себе"}
          ></Input>
        )}
      />
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
