import { Router } from 'express'
import UserController from '../controllers/user.controller.js'

const router = Router()

router.get('/', UserController.getUser)

router.patch('/update', UserController.updateUser)

router.delete('/delete', UserController.deleteUser)

export default router
