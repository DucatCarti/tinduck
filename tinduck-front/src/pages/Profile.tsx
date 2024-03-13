import React, {FormEvent, useEffect, useRef, useState} from "react"
import {MdOutlineAddAPhoto, MdOutlineModeEdit} from "react-icons/md"
import Button from "../components/ui/Button.tsx"
import {Controller, useForm} from "react-hook-form"
import {authAxios} from "../api/axios.ts"
import {GalleryCard} from "../components/profile/GalleryCard.tsx"
import {Input} from "../components/ui/Input.tsx"
import {InputSelect, Option} from "../components/ui/InputSelect.tsx"
import {cities} from "../static-data/cities.ts"
import {EditFieldsUserProfile, Gender, UserProfile} from "../types/UserData.ts"
import {InputChangeEvent} from "../types/Events.ts"
import {getProfile} from "../store/slice/auth.ts"
import {useAppDispatch, useAppSelector} from "../hooks/store.ts"
import {SelectorGenderPreference} from "../components/profile/SelectorGenderPreference.tsx"

export const Profile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    about: "",
    age: null,
    email: "",
    gender: Gender.Woman,
    genderPreference: Gender.Man,
    images: [],
    location: "",
    name: "",
    password: "",
  })
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const {
    control,
    watch,
    handleSubmit,
    resetField,
    reset,
    formState: {errors},
  } = useForm()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    getUsers()
  }, [])

  const profile = useAppSelector((state) => state.auth.profile)
  useEffect(() => {
    if (profile) {
      setUserProfile(profile)
    }
  }, [profile])

  const dispatch = useAppDispatch()
  const getUsers = async () => {
    await dispatch(getProfile())
  }
  const handleCustomSubmit = (event?: FormEvent<HTMLFormElement>) => {
    handleSubmit(editProfile)(event)
    resetField("images")
  }
  const deleteImage = (id: number) => {
    const updatedImages = userProfile.images.filter((image) => image.id !== id)

    editProfile({images: updatedImages})
  }
  const editProfile = async (data: EditFieldsUserProfile) => {
    await authAxios
      .post("profile/edit", {
        images: [...(data && data.images ? data.images : [])],
        about: data.about,
        location: data.location,
        genderPreference: data.genderPreference,
      })
      .then((res) => {
        console.log(res)
        setIsEdit(false)
        getUsers()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        reset()
      })
  }
  return (
    <div>
      <form
        ref={formRef}
        onSubmit={handleSubmit(editProfile)}
        className={"flex flex-col items-center"}
      >
        <div className={"mt-[30px] flex flex-col items-center justify-center "}>
          {!isEdit && (
            <>
              <div
                className={`w-[220px] h-[220px] rounded-full overflow-hidden ${!userProfile.images[0] && "loading min-h-[220px] min-w-[220px]"}`}
              >
                {userProfile.images[0] && (
                  <img
                    className={`w-full h-full object-cover`}
                    src={userProfile?.images?.[0]?.url}
                    alt=""
                  />
                )}
              </div>
            </>
          )}

          <div className={"my-[20px]"}>
            {!isEdit && (
              <p
                className={`text-xl font-semibold text-center ${!(userProfile.name && userProfile.age) && "loading"}`}
              >
                {userProfile.name} {userProfile.name && userProfile.age && ","}{" "}
                {userProfile.age}
              </p>
            )}
            {isEdit ? (
              <>
                <p className={"mb-[10px] text-xl text-center font-bold"}>
                  Выбирите пруд
                </p>
                <Controller
                  control={control}
                  name={"location"}
                  defaultValue={userProfile.location}
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
              </>
            ) : (
              <p
                className={`text-sm text-slate-600 font-regular text-center my-[20px] ${!userProfile.location && "loading"}`}
              >
                {userProfile.location}
              </p>
            )}
          </div>
        </div>
        {userProfile.about && !isEdit && (
          <div
            className={`mx-[30px] mb-[30px] ${!userProfile.about && "loading min-h-[200px]"}`}
          >
            <h3 className={`font-bold text-xl my-[10px] text-center`}>
              О себе
            </h3>
            <p className={"mx-[30px]"}>{userProfile.about}</p>
          </div>
        )}
        {isEdit && (
          <>
            <div
              className={`mx-[30px] mb-[30px] ${!userProfile.about && "loading min-h-[200px]"}`}
            >
              <h3 className={`font-bold text-xl my-[10px] text-center`}>
                О себе
              </h3>
              <Controller
                control={control}
                name={"about"}
                defaultValue={userProfile.about}
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
            <div className={"mb-[50px] flex flex-col items-center"}>
              <p className={"mb-[20px] font-bold text-xl"}>Кого вы ищите?</p>
              <SelectorGenderPreference
                control={control}
                watch={watch}
                defaultValue={userProfile.genderPreference}
              ></SelectorGenderPreference>
            </div>
          </>
        )}
        {!isEdit ? (
          <div className={"flex flex-row gap-[30px] item-align justify-center"}>
            <div
              onClick={(e) => {
                e.preventDefault()
                fileInputRef.current?.click()
              }}
              className={
                "p-[20px] transition-all ease-in hover:scale-125 cursor-pointer shadow-[1px_2px_6px_-1px_rgba(0,0,0,0.4)] border-black rounded-full"
              }
            >
              <MdOutlineAddAPhoto color={"#535bf2"} size={"40px"} />
            </div>
            <Controller
              control={control}
              name={"images"}
              rules={{required: "Добавьте минимум одно фото!"}}
              render={({field}) => (
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  ref={fileInputRef}
                  style={{display: "none"}}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    const reader = new FileReader()
                    reader.onload = (event: ProgressEvent<FileReader>) => {
                      const fileContent = event.target?.result as string
                      const prev = watch("images") as string
                      prev
                        ? field.onChange([
                            ...userProfile.images,
                            ...prev,
                            {url: `${fileContent}`},
                          ])
                        : field.onChange([
                            ...userProfile.images,
                            {url: `${fileContent}`},
                          ])
                      console.log(watch("images"))
                      handleCustomSubmit()
                    }
                    const files = Array.from(e.target.files as FileList)
                    files.forEach((file) => reader.readAsDataURL(file))
                  }}
                />
              )}
            />
            <div
              onClick={() => setIsEdit(true)}
              className={
                "p-[20px] transition-all ease-in hover:scale-125 cursor-pointer shadow-[1px_2px_6px_-1px_rgba(0,0,0,0.4)] border-black rounded-full"
              }
            >
              <MdOutlineModeEdit color={"#535bf2"} size={"40px"} />
            </div>
          </div>
        ) : (
          <Button onClick={() => editProfile}>Редактировать</Button>
        )}
        {}
        {userProfile?.images?.length > 1 && !isEdit && (
          <div
            className={`mx-[30px] ${!userProfile.images.length && "loading"}`}
          >
            <h3 className={"font-bold text-xl my-[15px] text-center"}>
              Gallery
            </h3>
            <div
              className={"flex flex-wrap gap-[8px] items-center justify-center"}
            >
              {userProfile?.images?.map((image) => (
                <div key={image.id}>
                  <GalleryCard
                    deleteImage={(id: number) => deleteImage(id)}
                    image={image}
                  ></GalleryCard>
                </div>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
