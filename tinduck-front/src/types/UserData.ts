export interface UserProfile {
  id?: number
  name: string
  email: string
  password: string
  age: number | null
  location: string
  about?: string
  images: Image[]
  gender: Gender
  genderPreference: Gender
  lastMessage?: LastMessage
}
export interface LastMessage {
  id: number
  receiverId: number
  senderId: number
  createdAt: string
  text: string
  senderName: string
}
export interface EditFieldsUserProfile {
  password?: string
  location?: string
  about?: string
  genderPreference?: Gender
  images?: Image[]
}
export interface Image {
  url: string
  id?: number
  userId?: number
}
export interface Message {
  id: number
  receiverId: number
  senderId: number
  createdAt: string
  text: string
}

export enum Gender {
  Man = "man",
  Woman = "woman",
  All = "all",
}
