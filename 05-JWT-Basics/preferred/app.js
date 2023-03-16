require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

// connecteing to database
const connectDB = require('./db/connect')

const router = require('./routes/main')
const notFoundMidddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//middleware
app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1', router)

app.use(notFoundMidddleware)
app.use(errorHandlerMiddleware)

const port = process.env.Port || 3000

const start = async () => {
	try {
		app.listen(port, console.log(`Server listening on port ${port}...`))
	} catch (error) {
		console.log(error)
	}
}

start()
