const { Router } = require('express')
const { insertPrescription , updatePrescription} = require('../controllers/PrescriptionController')
const router = Router()

router.post('/prescription/insert', insertPrescription)
router.put('/prescription/update/:idPrescription', updatePrescription)

module.exports = router