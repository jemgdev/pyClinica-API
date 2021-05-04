const { Router } = require('express')
const {insertDoctor, login, updateDoctorById, listDoctorBySpecialty, listDoctors, deleteDoctors} = require('../controllers/DoctorController')
const verifyTokenDoctor = require('../middlewares/TokenVerifyDoctor')
const verifyToken = require('../middlewares/TokenVerify')
const router = Router()

router.post('/doctor/insertDoctor', insertDoctor)
router.post('/doctor/login', login)
router.put('/doctor/updateDoctor/:idDoctor', verifyTokenDoctor, updateDoctorById)
router.get('/doctor/listSpecialty/:idSpecialty', verifyToken, listDoctorBySpecialty)
router.get('/doctor/list', listDoctors)
router.delete('/doctor/delete/:idDoctor', deleteDoctors)

module.exports = router