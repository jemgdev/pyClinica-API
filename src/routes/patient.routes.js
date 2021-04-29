const { Router } = require('express')
const { register } = require('../controllers/PatientController')
const router = Router()

router.post('/user/register', register)

module.exports = router