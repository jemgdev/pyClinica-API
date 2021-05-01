const { Router } = require('express')
const { listSpecialty,insertSpecialty } = require('../controllers/SpecialtyController')
const router = Router()

router.get('/specialty/listSpecialty', listSpecialty)
router.post('/specialty/insertSpecialty', insertSpecialty)
module.exports = router