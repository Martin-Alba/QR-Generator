import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import ServerUp from './connections/server.js'

const app = express()
app.disable('x-powered-by')

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.get('/', (req, res) => {
	res.json({ status: 'API is working' })
})

ServerUp(app)
