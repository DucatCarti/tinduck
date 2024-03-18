import {prisma} from "../../prisma.js";

let lastOfferUserId = null
export const getOfferUser = async (req, res) => {
	const userId = req.user.userId

	try {
		const { genderPreference } = req.body;
		const totalUsers = await prisma.user.count();
		const maxAttempts = totalUsers; // Максимальное количество попыток поиска

		// Предварительная фильтрация пользователей по полу
		const filteredUsers = await prisma.user.findMany({
			where: {
				gender: genderPreference
			},
			include: {
				images: true
			}
		});

		for (let i = 0; i < maxAttempts; i++) {
			const randomIndex = Math.floor(Math.random() * totalUsers);
			const randomUser = filteredUsers[randomIndex];

			// Если найден пользователь с заданным предпочтением по полу, вернуть его
			if (randomUser && randomUser.id !== userId && randomUser.id !== lastOfferUserId) {
				lastOfferUserId = randomUser.id
				return  res.status(200).json(randomUser);
			}
		}

		// Если не найден пользователь с заданным предпочтением по полу
		return  res.status(404).json({ message: 'User with specified gender preference not found' });
	} catch (error) {
		console.error('Error fetching offer user:', error);
		return  res.status(500).json({ message: 'Internal server error' });
	}
}






export const likeOffer = async (req, res) => {
	const senderId = +req.user.userId
	const receiverId = +req.params.id;
	try {
		// Проверяем существование обоих пользователей
		const sender = await prisma.user.findUnique({
			where: { id: senderId },
		});

		const receiver = await prisma.user.findUnique({
			where: { id: receiverId },
		});

		if (!sender || !receiver) {
			return res.status(404).json({ message: 'Пользователь не найден' });
		}

		// Создаем лайк
		await prisma.like.create({
			data: {
				senderId,
				receiverId,
			},
		});
// Добавляем лайк в список лайков отправителя
		// await prisma.user.update({
		// 	where: { id: senderId },
		// 	data: {
		// 		liked: {
		// 			connect: { id: receiverId },
		// 		},
		// 	},
		// });

		return res.status(200).json({ message: 'Лайк успешно добавлен' });
	} catch (error) {
		console.error('Ошибка:', error);
		return res.status(500).json({ error: 'Что-то пошло не так' });
	}
}


export const getLikedBy = async (req, res) => {
	const id = req.user.userId;
	try {
		const user = await prisma.user.findUnique({
			where: {
				id
			},
			include: {
				likedBy: true,
			}
		});

		const receiverIds = user.likedBy.map(like => like.receiverId);

		const likedByUsers = await prisma.user.findMany({
			where: {
				id: {
					in: receiverIds
				}
			},
			include: {
				images: true
			}
		});

		return res.status(200).send({ likedByUsers });
	} catch (error) {
		console.error('Ошибка:', error);
		return res.status(500).json({ error: 'Что-то пошло не так' });
	}
};
