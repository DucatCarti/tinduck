import {prisma} from "../../prisma.js";
import {hash, verify} from "argon2";
import {generateToken} from "./generateToken.js";


export const registerUser = async (req, res) => {
	const {name, email, password, age, location, about, gender, genderPreference, images} = req.body.data
	const isHaveUser = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});
	if (isHaveUser) {
		return res.status(400).json({ message: 'Пользователь с таким email уже существует'})
	}
	const user = await prisma.user.create({
		data: {
			email,
			password: await hash(password),
			name,
			age: Number(age),
			location,
			about,
			gender,
			genderPreference,
			images: {
				create: images
			}
		},
		include: {
			images: true
		}
	});
	const token = generateToken(user.id);
	return  res.status(200).json({ successRegister: true, user, token });
}
export const registerCheckEmail = async (req,res) => {

	const { email } = req.body
	try {
		const isHaveEmail = await prisma.user.findUnique({
			where: {
				email
			},
		})

		if (!!(!isHaveEmail)) {
			return  res.status(200).send({ emailFree: true })
		} else {
			return  res.status(400).send({ emailFree: false, message: 'Пользователь с таким email уже есть'})
		}
	} catch(err) {
		throw new Error(err)
	}
}

export const loginUser = async (req, res) => {
	const {email, password} = req.body.data
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
		include: {
			images: true
		}
	})
	if (!user) {
		return res.status(400).send({ message: 'Пользователя с таким email нет!'});
	}
	if (await verify(user?.password, password)) {
		const token = generateToken(user.id);
		return  res.status(200).json({ user, token });
	} else {
		return res.status(400).send({ message: 'Email или пароль не верны!'});
	}
}

export const getProfile = async (req, res) => {
	const id = req.user.userId
	const user = await prisma.user.findUnique({
		where: {
			id
		},
		include: {
			images: true,
		}
	})
	if (!user) {
		return  res.status(401).send({message: 'Такого профиля нет'})
	} else {
		return  res.status(200).send({ user })
	}
}

export const editProfile = async (req, res) => {
	const {images, about, location, genderPreference} = req.body
	const userId = req.user.userId
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				images: true,
			},
		});

		if (!user) {
			return res.status(401).json({ error: 'User not found' });
		}

		if (images.length) {
			await prisma.image.deleteMany({
				where: {
					userId: userId,
				},
			});

			const newImages = await Promise.all(
				images.map(async (image) => {
					return prisma.image.create({
						data: {
							url: image.url,
							userId: userId,
						},
					});
				})
			);
		}
		const updatedUser = await prisma.user.update({
			where: { id: userId },
			data: { about, location, genderPreference },
		});

		return  res.status(200).json({ message: 'Images updated successfully', profile: updatedUser });
	} catch (error) {
		console.error('Error updating images:', error);
		return  res.status(500).json({ error: 'Internal server error' });
	}
}