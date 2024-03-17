import React, {FormEvent, useEffect, useRef, useState} from "react"
import {useForm} from "react-hook-form"
import {authAxios} from "../../api/axios.ts"
import {
  EditFieldsUserProfile,
  Gender,
  UserProfile,
} from "../../types/UserData.ts"
import {getProfile, updateProfile} from "../../store/slice/auth.ts"
import {useAppDispatch, useAppSelector} from "../../hooks/store.ts"
import {ProfileEditForm} from "./components/ProfileEditForm.tsx"
import {ProfileInfo} from "./components/ProfileInfo.tsx"

export const Profile: React.FC = () => {
  const {
    control,
    watch,
    handleSubmit,
    resetField,
    reset,
    formState: {errors},
  } = useForm()
  const [userProfile, setUserProfile] = useState<UserProfile>({
    about: "",
    age: 0,
    email: "",
    gender: Gender.Man,
    genderPreference: Gender.All,
    images: [],
    location: "",
    name: "",
    password: "",
  })

  const dispatch = useAppDispatch()
  useEffect(() => {
    getUser()
  }, [])
  const getUser = async () => {
    await dispatch(getProfile())
  }
  const profile = useAppSelector((state) => state.auth.profile)
  useEffect(() => {
    if (profile) {
      setUserProfile(profile)
    }
  }, [profile])

  const [isEdit, setIsEdit] = useState<boolean>(false)
  const formRef = useRef<HTMLFormElement>(null)
  const handleCustomSubmit = (event?: FormEvent<HTMLFormElement>) => {
    handleSubmit(editProfile)(event)
    resetField("images")
  }
  const editProfile = async (data: EditFieldsUserProfile) => {
    await authAxios
      .post("profile/edit", {
        images: [...(data && data.images ? data.images : [])],
        about: data.about,
        location: data.location,
        genderPreference: data.genderPreference,
      })
      .then(() => {
        setIsEdit(false)
        dispatch(updateProfile())
        getUser()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        reset()
      })
  }
  const deleteImage = (id: number) => {
    const updatedImages = userProfile?.images?.filter(
      (image) => image.id !== id,
    )
    editProfile({images: updatedImages})
  }

  return (
    <div>
      <form
        ref={formRef}
        onSubmit={handleSubmit(editProfile)}
        className="flex flex-col items-center"
      >
        <div className="mt-[30px] flex flex-col items-center justify-center">
          {!isEdit ? (
            <ProfileInfo
              userProfile={userProfile}
              deleteImage={deleteImage}
              handleCustomSubmit={handleCustomSubmit}
              setIsEdit={setIsEdit}
              watch={watch}
              control={control}
            ></ProfileInfo>
          ) : (
            <ProfileEditForm
              control={control}
              watch={watch}
              errors={errors}
              editProfile={() => editProfile}
              userProfile={userProfile}
            ></ProfileEditForm>
          )}
        </div>
      </form>
    </div>
  )
}
