const { Router } = require('express')
const {insertDoctor, login, updateDoctorById, listDoctorBySpecialty} = require('../controllers/DoctorController')
const verifyTokenDoctor = require('../middlewares/TokenVerifyDoctor')
const verifyToken = require('../middlewares/TokenVerify')
const router = Router()

router.post('/doctor/insertDoctor', insertDoctor)
router.post('/doctor/login', login)
router.put('/doctor/updateDoctor/:idDoctor', verifyTokenDoctor, updateDoctorById)
router.get('/doctor/listSpecialty/:idSpecialty', verifyToken, listDoctorBySpecialty)

module.exports = router