const { Router } = require('express')
const {insertDoctor, login, updateDoctorById} = require('../controllers/DoctorController')
const verifyTokenDoctor = require('../middlewares/TokenVerifyDoctor')
const router = Router()

router.post('/doctor/insertDoctor', insertDoctor)
router.post('/doctor/login', login)
router.put('/doctor/updateDoctor/:idDoctor', verifyTokenDoctor, updateDoctorById)

module.exports = router