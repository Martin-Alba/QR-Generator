import QrService from '../services/qr.service.js'
import logger from '../utils/logger.js'

const createQrForUser = async (req, res) => {
	// Code here
}

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
	// Code here
}

const getQrById = async (req, res) => {
	// Code here
}

const deleteQr = async (req, res) => {
	// Code here
}

const QrController = {
	createQrForUser,
	createQrWithoutUser,
	getAllQrByUser,
	getQrById,
	deleteQr,
}

export default QrController
