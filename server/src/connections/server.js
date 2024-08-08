import database from './database.js'
import logger from '../utils/logger.js'

const ServerUp = async (app) => {
	try {
		database()
		app.listen(process.env.PORT, () => {
			logger.info(`Server is running on http://localhost:${process.env.PORT}`)
		})
	} catch (err) {
		logger.error(`Error starting the server: ${err}`)
	}
}

export default ServerUp
