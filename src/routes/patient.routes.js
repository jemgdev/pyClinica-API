const { Router } = require('express')
const { register, login, changePersonalInformation } = require('../controllers/PatientController')
const verifyToken = require('../middlewares/TokenVerify')
const router = Router()

router.post('/user/register', register)
router.post('/user/login', login)
router.put('/user/change-information', verifyToken, changePersonalInformation)

module.exports = router