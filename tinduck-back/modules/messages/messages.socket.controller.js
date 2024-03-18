import {prisma} from "../../prisma.js";

export const createNewMessage = async (data) => {
	try {
		await prisma.message.create({
			data: {
				text: data.message,
				senderId: data.senderId,
				receiverId: data.receiverId
			}
		});
	} catch (err) {
		throw new Error(err)
	}
}

export const getMessages = async (data) => {
	try {
		const messages = await prisma.message.findMany({
			where: {
				OR: [
					{
						receiverId: data.receiverId,
						senderId: data.senderId
					},
					{
						receiverId: data.senderId,
						senderId: data.receiverId
					}
				]
			}
		})
		return {messages: messages}
	} catch (err) {
		return {message: 'Ошибка получения диалога'}
	}

}


export const getAllChats = async (data) => {
	try {
		const userId = data.senderId
		if (userId)
		{
			const users = await prisma.user.findMany({
				where: {
					id: {
						not: userId // Исключаем текущего пользователя
					},
					OR: [
						{
							sentMessages: {
								some: {
									receiverId: userId
								}
							}
						},
						{
							receivedMessages: {
								some: {
									senderId: userId
								}
							}
						}
					]
				},
				include: {
					sentMessages: {
						where: {
							OR: [
								{
									receiverId: userId
								}
							]
						},
						orderBy: {
							createdAt: 'desc'
						},
						take: 1
					},
					receivedMessages: {
						where: {
							OR: [
								{
									senderId: userId
								}
							]
						},
						orderBy: {
							createdAt: 'desc'
						},
						take: 1
					},
					images: true
				},
				orderBy: {
					updatedAt: 'desc' // Сортировка по времени последнего обновления профиля пользователя
				}
			});

			const usersWithLastMessage = users.map(user => {
				let lastMessage = null;

				// Сначала проверяем отправленные сообщения
				if (user.sentMessages.length > 0) {
					lastMessage = user.sentMessages.reduce((prev, current) =>
						(new Date(current.createdAt) > new Date(prev.createdAt)) ? current : prev
					);
				}

				// Затем проверяем полученные сообщения, если нет отправленных или если последнее полученное сообщение новее
				if (user.receivedMessages.length > 0) {
					const lastReceivedMessage = user.receivedMessages.reduce((prev, current) =>
						(new Date(current.createdAt) > new Date(prev.createdAt)) ? current : prev
					);
					if (!lastMessage || new Date(lastReceivedMessage.createdAt) > new Date(lastMessage.createdAt)) {
						lastMessage = lastReceivedMessage;
					}
				}

				// Проверяем, кто отправил последнее сообщение, чтобы определить имя отправителя
				lastMessage.senderName = (lastMessage.senderId === userId) ? 'Вы' : user.name;
				return {
					...user,
					lastMessage: lastMessage
				};
			});
			return {chats: usersWithLastMessage};
		}
	} catch (error) {
		console.error('Error fetching users:', error);
		return {message: 'Ошибка получения чатов'}
	}
}