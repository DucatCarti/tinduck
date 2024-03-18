import React from "react"
import {InputSelect, Option} from "../../../components/ui/InputSelect.tsx"
import {cities} from "../../../static-data/cities.ts"
import Button from "../../../components/ui/Button.tsx"
import {Control, Controller, FieldErrors} from "react-hook-form"
import {ErrorMessage} from "../../../components/ui/ErrorMessage.tsx"

interface StepLocationProps {
  control: Control
  errors: FieldErrors
  stepRegisterBack: () => void
}

export const StepLocation: React.FC<StepLocationProps> = ({
  stepRegisterBack,
  control,
  errors,
}) => {
  return (
    <>
      <p>Из какого вы пруда?</p>
      <Controller
        control={control}
        name={"location"}
        rules={{required: "Поле является обязательным!"}}
        render={({field}) => (
          <>
            <InputSelect
              resetValue={() => field.onChange("")}
              value={field.value}
              options={cities}
              onSelect={(e: Option) => field.onChange(e.name)}
              type={"text"}
              label={"Пруд"}
            ></InputSelect>
          </>
        )}
      />
      {errors?.location?.message && (
        <ErrorMessage>{errors?.location?.message as string}</ErrorMessage>
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
