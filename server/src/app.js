import express from 'express'
import ServerUp from './connections/server.js'
const app = express()

app.get('/', (req, res) => {
	res.json({ status: 'API is working' })
})

ServerUp(app)
