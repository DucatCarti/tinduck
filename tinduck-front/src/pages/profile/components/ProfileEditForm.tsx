import React from "react"
import {Control, Controller, FieldErrors, WatchInternal} from "react-hook-form"
import {InputSelect, Option} from "../../../components/ui/InputSelect.tsx"
import {cities} from "../../../static-data/cities.ts"
import {Input} from "../../../components/ui/Input.tsx"
import {InputChangeEvent} from "../../../types/Events.ts"
import {SelectorGenderPreference} from "../../../components/profile/SelectorGenderPreference.tsx"
import Button from "../../../components/ui/Button.tsx"
import {UserProfile} from "../../../types/UserData.ts"

interface ProfileEditFormProps {
  control: Control
  errors: FieldErrors
  watch: WatchInternal<UserProfile>
  userProfile: UserProfile
  editProfile: () => void
}

export const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  control,
  errors,
  watch,
  userProfile,
  editProfile,
}) => {
  return (
    <>
      <p className="mb-[10px] text-xl text-center font-bold">Выбирите пруд</p>
      <Controller
        control={control}
        name={"location"}
        defaultValue={userProfile?.location}
        rules={{required: "Поле является обязательным!"}}
        render={({field}) => (
          <InputSelect
            errorMessage={errors?.location?.message as string}
            resetValue={() => field.onChange("")}
            value={field.value}
            options={cities}
            onSelect={(e: Option) => field.onChange(e.name)}
            type={"text"}
            label={"Пруд"}
          ></InputSelect>
        )}
      />
      <>
        <div
          className={`mx-[30px] mb-[30px] ${!userProfile?.about && "loading min-h-[200px]"}`}
        >
          <h3 className="font-bold text-xl my-[10px] text-center">О себе</h3>
          <Controller
            control={control}
            name={"about"}
            defaultValue={userProfile?.about}
            render={({field}) => (
              <Input
                cols={30}
                rows={10}
                onChange={(e: InputChangeEvent) => field.onChange(e)}
                value={field.value}
                type={"textarea"}
              ></Input>
            )}
          />
        </div>
        <div className="mb-[50px] flex flex-col items-center">
          <p className="mb-[20px] font-bold text-xl">Кого вы ищите?</p>
          <SelectorGenderPreference
            control={control}
            watch={watch}
            defaultValue={userProfile?.genderPreference}
          ></SelectorGenderPreference>
        </div>
        <Button onClick={() => editProfile}>Редактировать</Button>
      </>
    </>
  )
}
