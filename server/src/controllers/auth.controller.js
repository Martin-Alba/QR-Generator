import AuthService from '../services/auth.service.js'
import logger from '../utils/logger.js'

const SignUp = async (req, res) => {
	const userData = req.body

	try {
		const payload = await AuthService.SignUp(userData)

		res.status(payload.status).json(payload.message)
	} catch (err) {
		logger.error(`Error in AuthController.SignUp: ${err.message}`)
		res
			.status(500)
			.json({ error: 'An error occurred while creating a new user' })
	}
}

const SignIn = async (req, res) => {
	const userData = req.body

	try {
		const payload = await AuthService.SignIn(userData)

		res.cookie('token', payload.token, {
			httpOnly: true,
			secure: false, // -> change to true when in production
		})

		res.status(payload.status).json(payload.message)
	} catch (err) {
		logger.error(`Error in AuthController.SignIn: ${err.message}`)
		res.status(500).json({ error: 'An error occurred while signing in' })
	}
}

const SignOut = async (req, res) => {
	const token = req.cookies.token

	try {
		const payload = await AuthService.SignOut(token)

		res.clearCookie('token')
		res.cookie('token', '', {
			httpOnly: true,
			expires: new Date(0),
		})

		res.status(200).json(payload)
	} catch (err) {
		logger.error(`Error in AuthController.SignOut: ${err.message}`)
		res.status(500).json({ error: 'An error occurred while signing out' })
	}
}

const ForgotPassword = async (req, res) => {
	// Code here
}

const resetPassword = async (req, res) => {
	// Code here
}

const AuthController = {
	SignUp,
	SignIn,
	SignOut,
	ForgotPassword,
	resetPassword,
}

export default AuthController
