import { Router } from 'express'
import QrController from '../controllers/qr.controller..js'

const router = Router()

router.post('/createQR/:userId', QrController.createQrForUser)

router.post('/createQR', QrController.createQrWithoutUser)

router.get('/getMyQrs/:userId', QrController.getAllQrByUser)

router.get('/getQrById/:qrId', QrController.getQrById)

router.delete('/deleteQr/:qrId', QrController.deleteQr)

export default router
