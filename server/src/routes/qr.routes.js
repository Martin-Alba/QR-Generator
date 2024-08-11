import { Router } from 'express'
import QrController from '../controllers/qr.controller.js'

const router = Router()

router.post('/createQR', QrController.createQrWithoutUser)

router.get('/myQrs/', QrController.getAllQrByUser)

router.get('/myQr/:qrId', QrController.getQrById)

router.delete('/deleteQr/:qrId', QrController.deleteQr)

export default router
