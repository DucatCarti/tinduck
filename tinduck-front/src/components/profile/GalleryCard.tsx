import React, {useState} from "react"
import {IoClose} from "react-icons/io5"
import {Image} from "../../types/UserData.ts"

interface GalleryCardProps {
  image: Image
  deleteImage: (id: number) => void
}

export const GalleryCard: React.FC<GalleryCardProps> = ({
  image,
  deleteImage,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div
      className="relative w-[150px] h-[150px] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        key={image.id}
        className="w-full h-full object-cover"
        src={image.url}
        alt=""
      />
      {isHovered && (
        <button
          onClick={() => image.id && deleteImage(image.id)}
          className="absolute p-[3px] bg-slate-200 rounded-full top-[10px] right-[10px]"
        >
          <IoClose color={"black"}></IoClose>
        </button>
      )}
    </div>
  )
}
