const express = require('express')
const morgan = require('morgan')
const router = require('./routes/index.routes')
const app = express()

// Database
require('./database')

// Configuration
app.set('port', process.env.PORT || 4000)

// Middleware
app.use(express.json())
app.use(morgan('dev'))

// Routes
app.use(router.specialty)

// Listen
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})