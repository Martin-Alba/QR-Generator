import qr from 'qrcode'
import jwt from 'jsonwebtoken'
import QRModel from '../models/qr.model.js'
import UserModel from '../models/user.model.js'
import logger from '../utils/logger.js'

const createQrWithoutUser = async (data, token) => {
	try {
		if (!data) {
			logger.error('No data provided to create QR code')
			return { status: 400, message: 'No data provided to create QR code' }
		}

		const qrData = []
		if (data?.link) qrData.push(`Link: ${data.link}\n`)
		if (data?.phoneNumber) qrData.push(`Phone number: ${data.phoneNumber}\n`)
		if (data?.email) qrData.push(`Email: ${data.email}\n`)
		if (data?.fullname) qrData.push(`Fullname: ${data.fullname}\n`)
		if (data?.address) qrData.push(`Address: ${data.address}\n`)
		if (data?.jobTitle) qrData.push(`Job Title: ${data.jobTitle}\n`)
		if (data?.company) qrData.push(`Company: ${data.company}\n`)
		if (data?.web) qrData.push(`Web: ${data.web}\n`)

		logger.debug('QR Data:', qrData)

		if (qrData.length === 0) {
			logger.error('No valid data provided to create QR code')
			return {
				status: 400,
				message: 'No valid data provided to create QR code',
			}
		}

		const qrDataString = qrData.join('\n')
		const qrCode = await qr.toBuffer(qrDataString)

		if (token) {
			const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
			const userId = decodedToken.id

			const newQR = await QRModel.create({ qrCode })
			await UserModel.findByIdAndUpdate(userId, {
				$push: { qrCodes: newQR._id },
			})
		}

		logger.info('QR code created successfully')
		return {
			status: 201,
			message: 'QR code created successfully',
			qrCode,
		}
	} catch (err) {
		logger.error(`Error in QrService.createQrWithoutUser: ${err.message}`)
		throw new Error('An error occurred while creating a new QR')
	}
}

const createQrForUser = async () => {
	// Code here
}

const getAllQrByUser = async () => {
	// Code here
}

const getQrById = async () => {
	// Code here
}

const deleteQr = async () => {
	// Code here
}

const QrService = {
	createQrWithoutUser,
	createQrForUser,
	getAllQrByUser,
	getQrById,
	deleteQr,
}

export default QrService
