const { Router } = require('express')
const verifyTokenAdministrator = require('../middlewares/TokenVerifyAdministrator')
const {insertDoctor, login, updateDoctorById, listDoctorBySpecialty, listDoctors, deleteDoctors} = require('../controllers/DoctorController')
const verifyTokenDoctor = require('../middlewares/TokenVerifyDoctor')
const verifyToken = require('../middlewares/TokenVerify')
const router = Router()

router.post('/doctor/insert-doctor',verifyTokenAdministrator, insertDoctor)
router.post('/doctor/login', login)
router.put('/doctor/update-doctor/:iddoctor', verifyTokenDoctor, updateDoctorById)
router.get('/doctor/list-specialty/:idspecialty', verifyToken, listDoctorBySpecialty)
router.get('/doctor/list/patient',verifyToken, listDoctors)
router.get('/doctor/list/admin',verifyTokenAdministrator,listDoctors)
router.delete('/doctor/delete/:iddoctor',verifyTokenAdministrator, deleteDoctors)

module.exports = router