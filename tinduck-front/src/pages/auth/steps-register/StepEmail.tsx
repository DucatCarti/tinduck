import React, {useState} from "react"
import {Input} from "../../../components/ui/Input.tsx"
import Button from "../../../components/ui/Button.tsx"
import {Control, Controller, FieldErrors, WatchInternal} from "react-hook-form"
import {authAxios} from "../../../api/axios.ts"
import {UserProfile} from "../../../types/UserData.ts"
import {InputChangeEvent} from "../../../types/Events.ts"
import {Spinner} from "../../../components/ui/Spinner.tsx"

interface StepEmail {
  control: Control
  errors: FieldErrors
  watch: WatchInternal<UserProfile>
}

export const StepEmail: React.FC<StepEmail> = ({control, errors, watch}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const emailValidate = async (): Promise<boolean | string> => {
    const email: string = watch("email")
    let successfulValidate
    setIsLoading(true)
    await authAxios
      .post("register/email", {email: email})
      .then((res) => {
        if (res?.data?.emailFree) {
          successfulValidate = !!res.data?.emailFree
        } else {
          successfulValidate = res.data?.message
        }
      })
      .catch((err) => {
        console.log(err)
        return false
      })
      .finally(() => setIsLoading(false))
    return successfulValidate || "Ошибка проверки email"
  }

  return (
    <>
      {isLoading ? (
        <Spinner absolute={false}></Spinner>
      ) : (
        <Controller
          control={control}
          name={"email"}
          rules={{
            required: "Поле является обязательным!",
            validate: emailValidate,
          }}
          render={({field}) => (
            <Input
              errorMessage={errors?.email?.message as string}
              value={field.value}
              onChange={(e: InputChangeEvent) => field.onChange(e)}
              type={"email"}
              label={"Email"}
            ></Input>
          )}
        />
      )}

      <Button disabled={isLoading} className={"w-full"}>
        Продолжить
      </Button>
    </>
  )
}
