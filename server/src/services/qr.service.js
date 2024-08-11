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

const getAllQrByUser = async (token) => {
	try {
		if (!token) {
			logger.error('No token provided to fetch QR codes')
			return { status: 400, message: 'No token provided' }
		}

		const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
		const userId = decodedToken.id

		const user = await UserModel.findById(userId)
			.select('qrCodes')
			.populate('qrCodes')

		if (!user) {
			logger.error('User not found or has no QR codes')
			return { status: 404, message: 'User not found or has no QR codes' }
		}

		return {
			status: 200,
			message: 'QR codes fetched successfully',
			qrCodes: user.qrCodes,
		}
	} catch (err) {
		logger.error(`Error in QrService.getAllQrByUser: ${err.message}`)
		throw new Error('An error occurred while fetching all QRs')
	}
}

const getQrById = async (qrId, token) => {
	try {
		if (!qrId || !token) {
			logger.error('No QR ID or token provided to fetch QR code')
			return { status: 400, message: 'No QR ID or token provided' }
		}

		const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
		const userId = decodedToken.id

		const userQr = await UserModel.findOne({ _id: userId, qrCodes: qrId })
			.select('qrCodes')
			.populate('qrCodes')

		if (!userQr) {
			logger.error('QR not found or does not belong to user')
			return { status: 404, message: 'QR not found or does not belong to user' }
		}

		const qrCodes = userQr.qrCodes.find((qr) => qr._id.toString() === qrId)

		if (!qrCodes) {
			logger.error('QR code not found in the database')
			return { status: 404, message: 'QR code not found in the database' }
		}

		return {
			status: 200,
			message: 'QR fetched successfully',
			QR: qrCodes.qrCode,
		}
	} catch (err) {
		logger.error(`Error in QrService.getQrById: ${err.message}`)
		throw new Error('An error occurred while fetching the QR')
	}
}

const deleteQr = async (qrId, token) => {
	try {
		if (!qrId || !token) {
			logger.error('No QR ID or token provided to delete QR code')
			return { status: 400, message: 'No QR ID or token provided' }
		}

		const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
		const userId = decodedToken.id

		const user = await UserModel.findById(userId).select('qrCodes')

		if (!user) {
			logger.error('User not found or has no QR codes')
			return { status: 404, message: 'User not found or has no QR codes' }
		}

		const qrBelongsToUser = user.qrCodes.includes(qrId)

		if (!qrBelongsToUser) {
			logger.error('QR code does not belong to user')
			return { status: 403, message: 'QR code does not belong to user' }
		}

		await QRModel.findByIdAndDelete(qrId)

		user.qrCodes = user.qrCodes.filter((id) => id.toString() !== qrId)
		await user.save()

		return { status: 200, message: 'QR deleted successfully' }
	} catch (err) {
		logger.error(`Error in QrService.deleteQr: ${err.message}`)
		throw new Error('An error occurred while deleting the QR')
	}
}

const QrService = {
	createQrWithoutUser,
	createQrForUser,
	getAllQrByUser,
	getQrById,
	deleteQr,
}

export default QrService
