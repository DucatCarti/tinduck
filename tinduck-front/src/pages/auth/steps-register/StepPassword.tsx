import React from "react"
import {Input} from "../../../components/ui/Input.tsx"
import Button from "../../../components/ui/Button.tsx"
import {Control, Controller, FieldErrors, WatchInternal} from "react-hook-form"
import {UserProfile} from "../../../types/UserData.ts"
import {InputChangeEvent} from "../../../types/Events.ts"
import {Spinner} from "../../../components/ui/Spinner.tsx"

interface StepPasswordProps {
  control: Control
  errors: FieldErrors
  watch: WatchInternal<UserProfile>
  stepRegisterBack: () => void
  isLoading: boolean
}

export const StepPassword: React.FC<StepPasswordProps> = ({
  control,
  errors,
  watch,
  stepRegisterBack,
  isLoading,
}) => {
  const repetPassValidate = () => {
    if (watch("password") === watch("repetPassword")) {
      return true
    }
    return "Пароли должны совпадать!"
  }
  return (
    <>
      {isLoading ? (
        <Spinner absolute={false}></Spinner>
      ) : (
        <>
          <p>Накрякайте пароль</p>
          <Controller
            control={control}
            name={"password"}
            rules={{
              required: "Поля являются обязательным!",
              validate: repetPassValidate,
              minLength: {value: 6, message: "Минимум 6 символов"},
            }}
            render={({field}) => (
              <>
                <Input
                  onChange={(e: InputChangeEvent) => field.onChange(e)}
                  value={field.value}
                  type={"password"}
                  label={"Пароль"}
                ></Input>
              </>
            )}
          />

          <Controller
            control={control}
            name={"repetPassword"}
            rules={{
              required: "Поля являются обязательным!",
              validate: repetPassValidate,
              minLength: {value: 6, message: "Минимум 6 символов"},
            }}
            render={({field}) => (
              <>
                <Input
                  onChange={(e: InputChangeEvent) => field.onChange(e)}
                  value={field.value}
                  type={"password"}
                  label={"Повторите пароль"}
                ></Input>
              </>
            )}
          />
          {errors?.password?.message && (
            <p className="text-rose-700 text-xs">
              {errors?.password.message as string}
            </p>
          )}
        </>
      )}

      <div className="flex flex-col">
        <Button disabled={isLoading} className="w-full">
          Продолжить
        </Button>
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
