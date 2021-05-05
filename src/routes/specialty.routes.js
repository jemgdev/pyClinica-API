const { Router } = require('express')
const { listSpecialty,insertSpecialty, deleteSpecialty, updateSpecialty, ListOnlyDoctors,listSpecialtyByCampus } = require('../controllers/SpecialtyController')
const router = Router()

router.get('/specialty/listSpecialty', listSpecialty)
router.post('/specialty/insertSpecialty', insertSpecialty)
router.delete('/specialty/deleteSpecialty/:specialtyId', deleteSpecialty)
router.put('/specialty/updateSpecialty/:specialtyId', updateSpecialty)
router.get('/specialty/ListOnlyDoctors/:specialtyId', ListOnlyDoctors)
router.get('/specialty/listSpecialtyByCampus/:idCampus',listSpecialtyByCampus)
module.exports = router