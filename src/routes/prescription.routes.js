const { Router } = require('express')
const { insertPrescription , updatePrescription, listPrescriptionByIdDoctor, listPrescriptionByIdPatient} = require('../controllers/PrescriptionController')
const router = Router()

router.post('/prescription/insert', insertPrescription)
router.put('/prescription/update/:id-prescription', updatePrescription)
router.get('/prescription/listprescriptions/doctor/:id-doctor', listPrescriptionByIdDoctor)
router.get('/prescription/listprescriptions/patient/:id-patient', listPrescriptionByIdPatient)

module.exports = router