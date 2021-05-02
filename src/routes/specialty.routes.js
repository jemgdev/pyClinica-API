const { Router } = require('express')
const { listSpecialty,insertSpecialty, deleteSpecialty, updateSpecialty } = require('../controllers/SpecialtyController')
const router = Router()

router.get('/specialty/listSpecialty', listSpecialty)
router.post('/specialty/insertSpecialty', insertSpecialty)
router.delete('/specialty/deleteSpecialty/:specialtyId', deleteSpecialty)
router.put('/specialty/updateSpecialty/:specialtyId', updateSpecialty)
module.exports = router