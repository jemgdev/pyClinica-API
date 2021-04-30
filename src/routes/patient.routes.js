const { Router } = require('express')
const { register, login } = require('../controllers/PatientController')
const router = Router()

router.post('/user/register', register)
router.post('/user/login', login)

module.exports = router