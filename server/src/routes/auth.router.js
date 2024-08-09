import { Router } from 'express'
import AuthController from '../controllers/auth.controller.js'

const router = Router()

router.post('/signup', AuthController.SignUp)

router.post('/signin', AuthController.SignIn)

router.post('/signout', AuthController.SignOut)

router.post('/forgotpassword', AuthController.ForgotPassword)

router.post('/resetpassword', AuthController.resetPassword)

export default router
