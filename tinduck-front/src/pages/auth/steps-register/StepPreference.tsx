import React from "react"
import Button from "../../../components/ui/Button.tsx"
import {Control, FieldErrors, WatchInternal} from "react-hook-form"
import {UserProfile} from "../../../types/UserData.ts"
import {SelectorGenderPreference} from "../../../components/profile/SelectorGenderPreference.tsx"

interface StepPreferenceProps {
  control: Control
  errors: FieldErrors
  watch: WatchInternal<UserProfile>
  stepRegisterBack: () => void
}

export const StepPreference: React.FC<StepPreferenceProps> = ({
  watch,
  control,
  stepRegisterBack,
  errors,
}) => {
  return (
    <>
      <p>Кого вы хотите найти?</p>
      <SelectorGenderPreference
        control={control}
        watch={watch}
      ></SelectorGenderPreference>
      {(errors?.genderPreference?.message as string) && (
        <p className="text-rose-700 text-xs">
          {errors?.genderPreference?.message as string}
        </p>
      )}
      <div className="flex flex-col">
        <Button className="w-full">Продолжить</Button>
        <button
          onClick={() => stepRegisterBack()}
          className="text-[#535bf2] font-bold mt-[12px] text-sm"
        >
          Назад
        </button>
      </div>
    </>
  )
}
