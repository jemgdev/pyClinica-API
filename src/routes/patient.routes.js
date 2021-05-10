const { Router } = require('express')
const { register, login, changePersonalInformation, changePassword, getPatientById } = require('../controllers/PatientController')
const verifyToken = require('../middlewares/TokenVerify')
const router = Router()

router.post('/patient/register', register)
router.post('/patient/login', login)
router.get('/patient', verifyToken, getPatientById)
router.put('/patient/change-information', verifyToken, changePersonalInformation)
router.put('/patient/change-password', verifyToken, changePassword)

module.exports = router