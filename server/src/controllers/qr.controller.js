import QrService from '../services/qr.service.js'
import logger from '../utils/logger.js'

const createQrWithoutUser = async (req, res) => {
	const data = req.body
	const token = req.cookies.token

	try {
		const payload = await QrService.createQrWithoutUser(data, token)

		res.type('image/png')
		res.status(payload.status).send(payload.qrCode)
	} catch (err) {
		logger.error(`Error in QrController.createQrWithoutUser: ${err.message}`)
		res.status(500).json({ error: 'An error occurred while creating a new QR' })
	}
}

const getAllQrByUser = async (req, res) => {
	const token = req.cookies.token

	try {
		const payload = await QrService.getAllQrByUser(token)

		res.status(payload.status).json(payload.qrCodes)
	} catch (err) {
		logger.error(`Error in QrController.getAllQrByUser: ${err.message}`)
		res.status(500).json({ error: 'An error occurred while fetching all QRs' })
	}
}

const getQrById = async (req, res) => {
	const qrId = req.params.qrId
	const token = req.cookies.token

	try {
		const payload = await QrService.getQrById(qrId, token)

		if ([400, 404].includes(payload.status)) {
			return res.status(payload.status).json(payload.message)
		}

		res.type('image/png')
		res.status(payload.status).send(payload.QR)
	} catch (err) {
		logger.error(`Error in QrController.getQrById: ${err.message}`)
		res.status(500).json({ error: 'An error occurred while fetching the QR' })
	}
}

const deleteQr = async (req, res) => {
	const qrId = req.params.qrId
	const token = req.cookies.token

	try {
		const payload = await QrService.deleteQr(qrId, token)

		if ([400, 403, 404].includes(payload.status)) {
			return res.status(payload.status).json(payload.message)
		}

		res.status(payload.status).json(payload.message)
	} catch (err) {
		logger.error(`Error in QrController.deleteQr: ${err.message}`)
		res.status(500).json({ error: 'An error occurred while deleting the QR' })
	}
}

const QrController = {
	createQrWithoutUser,
	getAllQrByUser,
	getQrById,
	deleteQr,
}

export default QrController
