import mongoose from 'mongoose'
import logger from '../utils/logger.js'

const database = async () => {
	if (process.env.PERSISTACE === 'PROD') {
		try {
			await mongoose.connect(process.env.ATLAS_URI, {
				dbName: process.env.DB_NAME,
			})
			logger.info('Server connected to the database (Cluster)')
			return
		} catch (err) {
			logger.error(`Error connecting to the database (Cluster): ${err}`)
		}
	}

	try {
		await mongoose.connect(process.env.MONGO_URI, {
			dbName: process.env.DB_NAME,
		})
		logger.info('Server connected to the database (local)')
	} catch (err) {
		logger.error(`Error connecting to the database (local): ${err}`)
	}
}

export default database
