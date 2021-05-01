if (process.env.NODE_ENV === "development") {
    require('dotenv').config()
} 

const express = require('express')
const morgan = require('morgan')
const router = require('./routes/index.routes')
const app = express()

// Database
require('./database')

// Configuration
app.set('port', process.env.PORT)

// Middleware
app.use(express.json())
app.use(morgan('dev'))

// Routes
app.use(router.specialty)
app.use(router.patient)
app.use(router.administrator);
app.use(router.medicalappointment);
app.use(router.campus);

// Listen
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})