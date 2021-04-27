const { Router } = require('express')
const { specialtyList, insertSpecialty } = require('../controllers/SpecialtyController')
const router = Router()

router.get('/specialty', specialtyList)
router.post('/specialty', insertSpecialty)

module.exports = router