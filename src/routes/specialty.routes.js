const { Router } = require('express')
const { listSpecialty,insertSpecialty, deleteSpecialty, updateSpecialty, listSpecialtyByCampus } = require('../controllers/SpecialtyController')
const verifyTokenAdministrator = require('../middlewares/TokenVerifyAdministrator')
const verifyToken = require('../middlewares/TokenVerify')
const router = Router()

router.get('/specialty/listspecialty', verifyTokenAdministrator,listSpecialty)
router.post('/specialty/insertspecialty',verifyTokenAdministrator, insertSpecialty)
router.delete('/specialty/deletespecialty/:specialtyid', verifyTokenAdministrator, deleteSpecialty)
router.put('/specialty/updatespecialty/:specialtyid', verifyTokenAdministrator, updateSpecialty)
router.get('/specialty/listspecialtybycampus/:campusid',verifyToken,listSpecialtyByCampus)
//router.get('/specialty/listonlydoctors/:specialty-id', ListOnlyDoctors)
module.exports = router