const { Router } = require('express')
const { register, login, changePersonalInformation } = require('../controllers/PatientController')
const { tokenExist } = require('../middlewares/TokenVerify')
const router = Router()

router.post('/user/register', register)
router.post('/user/login', login)
router.put('/user/change-information', tokenExist, changePersonalInformation)

module.exports = router