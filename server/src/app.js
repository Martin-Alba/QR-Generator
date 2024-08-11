import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import ServerUp from './connections/server.js'
import AuthRoutes from './routes/auth.routes.js'
import UserRoutes from './routes/user.routes.js'
import QrRoutes from './routes/qr.routes.js'

const app = express()
app.disable('x-powered-by')

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.get('/', (req, res) => {
	res.json({ status: 'API is working' })
})

app.use('/api/auth', AuthRoutes)
app.use('/api/user', UserRoutes)
app.use('/api/qr', QrRoutes)

ServerUp(app)
