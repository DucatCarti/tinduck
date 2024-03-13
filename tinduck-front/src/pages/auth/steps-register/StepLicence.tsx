import React, {useState} from "react"
import Button from "../../../components/ui/Button.tsx"

interface StepLicenceProps {
  stepRegisterBack: () => void
}

export const StepLicence: React.FC<StepLicenceProps> = ({stepRegisterBack}) => {
  const [licenceOk, setLicenceOk] = useState<boolean>(false)
  return (
    <>
      <p className={"text-center"}>
        Вы принимаете условия лицензионного соглашения?
      </p>

      <p className={"font-bold"}>Вы обязанны крякать!</p>

      <label
        className={"flex flex-row gap-[10px] items-center"}
        htmlFor="licence"
      >
        <p>Кря?</p>
        <button
          onClick={(e) => {
            e.preventDefault()
            setLicenceOk((prev) => !prev)
          }}
          className={`h-[15px] w-[15px] p-[1px] rounded-full border-2 border-slate-400 ${licenceOk ? "bg-[#535bf2]" : "bg-white"}`}
        />
      </label>
      <div className={"flex flex-col"}>
        <Button disabled={!licenceOk} className={"w-full"}>
          Продолжить
        </Button>
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
