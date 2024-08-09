import UserModel from '../models/user.model.js'
import logger from '../utils/logger.js'
import Hash from '../utils/hash.js'

const SignUp = async (userData) => {
	const { username, password, email } = userData

	if (!username || !password || !email) {
		logger.warn('Missing required fields')
		return { status: 400, message: 'Missing required fields' }
	}

	const userExists = await UserModel.findOne({
		$or: [{ username }, { email }],
	})

	if (userExists) {
		logger.warn('User or email already exists')
		return { status: 409, message: 'User or email already exists' }
	}

	try {
		const hashedPassword = await Hash.create(password)

		await UserModel.create({
			username,
			password: hashedPassword,
			email,
		})

		logger.info(`User ${username} created successfully`)
		return { status: 201, message: `User ${username} created successfully` }
	} catch (err) {
		logger.error(`Error in AuthService.SignUp: ${err.message}`)
		throw new Error('An error occurred while creating a new user')
	}
}

const SignIn = async (userData) => {
	const { username, email, password } = userData
	try {
		const user = await UserModel.findOne({
			$or: [{ username }, { email }],
		})

		if (!user) {
			logger.warn('User not found')
			return { status: 404, message: 'User not found' }
		}

		const matchPassword = await Hash.compare(password, user.password)

		if (!matchPassword) {
			logger.warn('Invalid password')
			return { status: 401, message: 'Invalid password' }
		}

		return {
			status: 200,
			message: `User ${user.username} signed in successfully`,
		}
	} catch (err) {
		logger.error(`Error in AuthService.SignIn: ${err.message}`)
		throw new Error('An error occurred while signing in')
	}
}

const SignOut = async (userId) => {
	// -> refactorizar con jwt
	try {
		if (!userId) {
			logger.warn('Missing required fields')
			throw new Error('Missing required fields')
		}

		const user = await UserModel.findByIdAndUpdate(userId, {
			$set: { token: '' },
		})

		if (!user) {
			logger.warn('User not found')
			throw new Error('User not found')
		}

		logger.info(`User ${user.username} signed out successfully`)
		return { message: 'User signed out successfully' }
	} catch (err) {
		logger.error(`Error in AuthService.SignOut: ${err.message}`)
		throw new Error('An error occurred while signing out')
	}
}

const ForgotPassword = async () => {
	// Code here
}

const resetPassword = async () => {
	// Code here
}

const AuthService = {
	SignUp,
	SignIn,
	SignOut,
	ForgotPassword,
	resetPassword,
}

export default AuthService
