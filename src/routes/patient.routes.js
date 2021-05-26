const { Router } = require('express')
const { register, login, changePersonalInformation, changePassword, changeAvatar, getPatientById } = require('../controllers/PatientController')
const verifyToken = require('../middlewares/TokenVerify')
const router = Router()

router.post('/patient/register', register)
router.post('/patient/login', login)
router.get('/patient/get-information', verifyToken, getPatientById)
router.put('/patient/change-information', verifyToken, changePersonalInformation)
router.put('/patient/change-password', verifyToken, changePassword)
router.put('/patient/change-avatar', verifyToken, changeAvatar)

module.exports = router