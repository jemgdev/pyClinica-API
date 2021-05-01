const { Router } = require('express')
const {insertDoctor} = require('../controllers/DoctorController')

const router = Router()

router.post('/doctor/insertDoctor', insertDoctor)

module.exports = router