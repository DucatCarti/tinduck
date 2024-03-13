import jwt from 'jsonwebtoken'
// @ts-ignore
export const generateToken = userId => {
	return  jwt.sign(
		{
			userId
		},
		process.env.JWT_SECRET,
		{
			expiresIn: '10d'
		}
	)
}