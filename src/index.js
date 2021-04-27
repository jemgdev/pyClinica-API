const express = require('express')
const morgan = require('morgan')
const app = express()

// Database
require('./database')

// Configuration
app.set('port', process.env.PORT || 3000)

// Middleware
app.use(express.json())
app.use(morgan('dev'))

// Listen
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})