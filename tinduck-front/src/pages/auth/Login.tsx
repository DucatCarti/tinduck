import React, {useState} from "react"
import {Input} from "../../components/ui/Input.tsx"
import Button from "../../components/ui/Button.tsx"
import {Link, useNavigate} from "react-router-dom"
import {Controller, FieldValues, SubmitHandler, useForm} from "react-hook-form"
import {authAxios} from "../../api/axios.ts"

export const Login: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
    clearErrors,
  } = useForm()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const submit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)
    await authAxios
      .post("login", {data})
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token)
          localStorage.setItem("user", JSON.stringify(res.data.user))
          console.log(res.data)
          clearErrors("password")
          if (res.data.user) {
            navigate("/")
          }
        }
        if (res.status === 400) {
          setError("password", {type: "custom", message: res.data.message})
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  return (
    <div
      className={
        "mx-auto flex flex-col items-center justify-center w-[250px] mt-[0px]"
      }
    >
      <form
        onSubmit={handleSubmit(submit)}
        className={
          "flex flex-col items-center justify-center gap-[30px] w-full my-[10px] mt-[40px]"
        }
      >
        <Controller
          control={control}
          name={"email"}
          rules={{required: "Поле является обязательным!"}}
          render={({field}) => (
            <Input
              errorMessage={errors?.email?.message as string}
              value={field.value}
              onChange={(e) => field.onChange(e)}
              type={"email"}
              label={"Email"}
            ></Input>
          )}
        />
        <Controller
          control={control}
          name={"password"}
          rules={{
            required: "Поля являются обязательным!",
            minLength: {value: 6, message: "Минимум 6 символов"},
          }}
          render={({field}) => (
            <>
              <Input
                onChange={(e) => field.onChange(e)}
                errorMessage={errors?.password?.message as string}
                value={field.value}
                type={"password"}
                label={"Пароль"}
              ></Input>
            </>
          )}
        />
        <Button disabled={isLoading} className={"w-full"}>
          Войти
        </Button>
        <p className={"text-sm text-center"}>
          Если у вас еще нет аккаунта -{" "}
          <Link className={"text-[#535bf2] font-bold"} to={"/register"}>
            зарегистрируйтесь
          </Link>{" "}
        </p>
      </form>
    </div>
  )
}
