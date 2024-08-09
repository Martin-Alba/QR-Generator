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
		res.status(payload.status).json(payload.message)
	} catch (err) {
		logger.error(`Error in AuthController.SignIn: ${err.message}`)
		res.status(500).json({ error: 'An error occurred while signing in' })
	}
}

const SignOut = async (req, res) => {
	const { userId } = req.params

	try {
		const payload = await AuthService.SignOut(userId)
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
