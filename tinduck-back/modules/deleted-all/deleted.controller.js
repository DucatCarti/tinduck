import {prisma} from "../../prisma.js";

export const deleteUsers =  async (req, res) => {
	const deleteUsers = await prisma.user.deleteMany({})
}
export const deleteImages = async (req, res) => {
	const deleteImages = await prisma.image.deleteMany({})
}
export const deleteLike = async (req, res) => {
	const deleteLike = await prisma.like.deleteMany({})
}
export const deleteMessage = async (req, res) => {
	const deleteMessage = await prisma.message.deleteMany({})
}
export const deleteAll = async (req, res) => {
	await deleteUsers()
	await deleteImages()
	await deleteLike()
	await deleteMessage()
}