const { Router } = require('express')
const { insertPrescription , updatePrescription, listPrescriptionByIdDoctor, listPrescriptionByIdPatient, deletePrescriptionByDoctor, deletePrescriptionByPaciente} = require('../controllers/PrescriptionController')
const router = Router()

router.post('/prescription/insert', insertPrescription)
router.put('/prescription/update/:idPrescription', updatePrescription)
router.get('/prescription/listPrescriptions/doctor/:idDoctor', listPrescriptionByIdDoctor)
router.get('/prescription/listPrescriptions/patient/:idPatient', listPrescriptionByIdPatient)
router.delete('/prescription/delete/doctor/:idPrescription', deletePrescriptionByDoctor)
router.delete('/prescription/delete/patient/:idPrescription', deletePrescriptionByPaciente)

module.exports = router