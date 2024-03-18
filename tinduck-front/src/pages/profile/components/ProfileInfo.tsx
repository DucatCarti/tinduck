import React, {useRef} from "react"
import {MdOutlineAddAPhoto, MdOutlineModeEdit} from "react-icons/md"
import {Control, Controller, WatchInternal} from "react-hook-form"
import {GalleryCard} from "../../../components/profile/GalleryCard.tsx"
import {UserProfile} from "../../../types/UserData.ts"

interface ProfileInfoProps {
  control: Control
  watch: WatchInternal<UserProfile>
  userProfile: UserProfile
  handleCustomSubmit: () => void
  deleteImage: (id: number) => void
  setIsEdit: (e: boolean) => void
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({
  watch,
  userProfile,
  control,
  handleCustomSubmit,
  deleteImage,
  setIsEdit,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <div
        className={`w-[220px] h-[220px] rounded-full overflow-hidden ${!userProfile?.images?.[0] && "loading min-h-[220px] min-w-[220px]"}`}
      >
        {userProfile?.images?.[0] && (
          <img
            className="w-full h-full object-cover"
            src={userProfile?.images?.[0]?.url}
            alt=""
          />
        )}
      </div>
      <div className="mt-[20px]">
        <p
          className={`text-xl font-semibold text-center ${!(userProfile?.name && userProfile?.age) && "loading"}`}
        >
          {userProfile?.name} {userProfile?.name && userProfile?.age && ","}{" "}
          {userProfile?.age}
        </p>
      </div>
      <p
        className={`text-sm text-slate-600 font-regular text-center my-[20px] ${!userProfile?.location && "loading"}`}
      >
        {userProfile?.location}
      </p>
      {userProfile?.about && (
        <div
          className={`mx-[30px] mb-[30px] ${!userProfile?.about && "loading min-h-[200px]"}`}
        >
          <h3 className="font-bold text-xl my-[10px] text-center">О себе</h3>
          <p className="mx-[30px]">{userProfile?.about}</p>
        </div>
      )}
      <div className="flex flex-row gap-[30px] item-align justify-center">
        <div
          onClick={(e) => {
            e.preventDefault()
            fileInputRef.current?.click()
          }}
          className="p-[20px] transition-all ease-in hover:scale-125 cursor-pointer shadow-[1px_2px_6px_-1px_rgba(0,0,0,0.4)] border-black rounded-full"
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
                        ...userProfile?.images,
                        ...prev,
                        {url: `${fileContent}`},
                      ])
                    : field.onChange([
                        ...userProfile?.images,
                        {url: `${fileContent}`},
                      ])
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
          className="p-[20px] transition-all ease-in hover:scale-125 cursor-pointer shadow-[1px_2px_6px_-1px_rgba(0,0,0,0.4)] border-black rounded-full"
        >
          <MdOutlineModeEdit color={"#535bf2"} size={"40px"} />
        </div>
      </div>
      {userProfile?.images?.length > 1 && (
        <div
          className={`mx-[30px] my-[15px] ${!userProfile?.images.length && "loading"}`}
        >
          <h3 className="font-bold text-xl my-[15px] text-center">Gallery</h3>
          <div className="flex flex-wrap gap-[8px] items-center justify-center">
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
    </>
  )
}
