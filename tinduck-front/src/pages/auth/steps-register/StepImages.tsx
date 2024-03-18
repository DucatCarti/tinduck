import React, {ChangeEvent, useRef} from "react"
import {MdOutlineAddAPhoto} from "react-icons/md"
import {Swiper, SwiperSlide} from "swiper/react"
import {EffectCards} from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-cards"
import {IoClose} from "react-icons/io5"
import Button from "../../../components/ui/Button.tsx"
import {Control, Controller, FieldErrors, WatchInternal} from "react-hook-form"
import {Image, UserProfile} from "../../../types/UserData.ts"
import {ErrorMessage} from "../../../components/ui/ErrorMessage.tsx"

interface StepImagesProps {
  control: Control
  errors: FieldErrors
  watch: WatchInternal<UserProfile>
  stepRegisterBack: () => void
}

export const StepImages: React.FC<StepImagesProps> = ({
  stepRegisterBack,
  control,
  watch,
  errors,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <div>
        <div className="flex flex-row items-center gap-[20px]">
          <p className="text-xl">Добавьте фотографии</p>
        </div>
      </div>
      <div className="relative">
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              fileInputRef.current?.click()
            }}
            className="absolute z-10 top-[-20px] left-[-10px] bg-white p-[15px] rounded-full shadow-[1px_2px_6px_-1px_rgba(0,0,0,0.4)]"
          >
            <MdOutlineAddAPhoto size={"30px"} />
          </button>
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const reader = new FileReader()
                  reader.onload = (event: ProgressEvent<FileReader>) => {
                    const fileContent = event.target?.result as string
                    const prev = watch("images") as string
                    prev
                      ? field.onChange([...prev, {url: `${fileContent}`}])
                      : field.onChange([{url: `${fileContent}`}])
                  }
                  const files = Array.from(e.target.files as FileList)
                  files.forEach((file) => reader.readAsDataURL(file))
                }}
              />
            )}
          />
        </div>
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
        >
          {watch("images")?.length >= 1 ? (
            watch("images").map((image: Image) => (
              <SwiperSlide key={image.url}>
                <div className="w-full h-full relative">
                  <Controller
                    control={control}
                    name={"images"}
                    render={({field}) => (
                      <IoClose
                        className="absolute top-[10px] right-[10px] cursor-pointer"
                        size={"23px"}
                        onClick={() => {
                          const prev = watch("images")
                          const filterImages = prev.filter(
                            (img: Image) => img.url !== image?.url,
                          )
                          field.onChange([...filterImages])
                        }}
                      />
                    )}
                  />

                  <img
                    className="w-full h-full object-cover"
                    src={image?.url}
                    alt=""
                  />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div
                onClick={() => {
                  fileInputRef.current?.click()
                }}
                className="w-full h-full bg-slate-100 cursor-pointer"
              />
            </SwiperSlide>
          )}
        </Swiper>
      </div>
      {errors?.images?.message && (
        <ErrorMessage>{errors?.images?.message as string}</ErrorMessage>
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
