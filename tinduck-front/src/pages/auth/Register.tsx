import React, {useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import {StepEmail} from "./steps-register/StepEmail.tsx"
import {FieldValues, SubmitHandler, useForm} from "react-hook-form"
import {StepLicence} from "./steps-register/StepLicence.tsx"
import {StepInfo} from "./steps-register/StepInfo.tsx"
import {StepAbout} from "./steps-register/StepAbout.tsx"
import {StepPreference} from "./steps-register/StepPreference.tsx"
import {StepImages} from "./steps-register/StepImages.tsx"
import {StepLocation} from "./steps-register/StepLocation.tsx"
import {StepPassword} from "./steps-register/StepPassword.tsx"
import {$axios} from "../../api/axios.ts"

export const Register: React.FC = () => {
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    watch,
    formState: {errors},
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {},
    mode: "onBlur",
    reValidateMode: "onBlur",
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const submit: SubmitHandler<FieldValues> = async (data) => {
    if (stepRegister < stepMax) {
      setStepRegister((prev) => ++prev)
    }
    if (stepRegister === stepMax && !Object.keys(errors).length) {
      setIsLoading(true)

      await $axios
        .post("auth/register", {data})
        .then((res) => {
          if (res.status === 200) {
            $axios.defaults.headers.common["Authorization"] =
              "Bearer " + res.data.token
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("user", JSON.stringify(res.data.user))
            clearErrors()
            navigate("/")
          } else {
            setError("root.register", {
              type: "custom",
              message:
                res?.data?.message ||
                "Неизвестная ошибка. Тыкните клювом в разработчика",
            })
          }
        })
        .catch((err) => {
          console.error(err)
          setError("root.register", {
            type: "custom",
            message: "Ошибка запроса на сервер. Тыкните клювом в разработчика",
          })
        })
        .finally(() => setIsLoading(false))
    }
  }

  const [stepRegister, setStepRegister] = useState(1)
  const stepRegisterBack = () => setStepRegister((prev) => --prev)
  const stepMax = 8
  const progress = (stepRegister / stepMax) * 100

  return (
    <div className="mx-auto flex flex-col items-center justify-center w-[250px] mt-[0px]">
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col items-center justify-center gap-[30px] w-full my-[10px] mt-[40px]"
      >
        {stepRegister === 1 && (
          <StepEmail watch={watch} errors={errors} control={control} />
        )}
        {stepRegister === 2 && (
          <StepLicence
            stepRegisterBack={() => stepRegisterBack()}
          ></StepLicence>
        )}
        {stepRegister === 3 && (
          <StepInfo
            errors={errors}
            control={control}
            stepRegisterBack={() => stepRegisterBack()}
            watch={watch}
          ></StepInfo>
        )}
        {stepRegister === 4 && (
          <StepAbout
            control={control}
            stepRegisterBack={() => stepRegisterBack()}
          ></StepAbout>
        )}
        {stepRegister === 5 && (
          <StepPreference
            errors={errors}
            watch={watch}
            control={control}
            stepRegisterBack={() => stepRegisterBack()}
          ></StepPreference>
        )}
        {stepRegister === 6 && (
          <StepImages
            errors={errors}
            watch={watch}
            control={control}
            stepRegisterBack={() => stepRegisterBack()}
          ></StepImages>
        )}
        {stepRegister === 7 && (
          <StepLocation
            errors={errors}
            control={control}
            stepRegisterBack={() => stepRegisterBack()}
          ></StepLocation>
        )}
        {stepRegister === 8 && (
          <StepPassword
            isLoading={isLoading}
            control={control}
            errors={errors}
            watch={watch}
            stepRegisterBack={() => stepRegisterBack()}
          ></StepPassword>
        )}
        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#535bf2] transition-all ease-in duration-500"
            style={{width: `${progress}%`}}
          ></div>
        </div>
        <p className="text-sm text-center">
          Если у вас есть аккаунт -{" "}
          <Link className="text-[#535bf2] font-bold" to={"/login"}>
            войдите
          </Link>{" "}
        </p>
      </form>
    </div>
  )
}
