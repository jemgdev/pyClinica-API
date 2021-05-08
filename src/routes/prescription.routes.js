const { Router } = require('express')
const verifyTokenDoctor = require('../middlewares/TokenVerifyDoctor')
const verifyToken = require('../middlewares/TokenVerify')
const { insertPrescription , updatePrescription, listPrescriptionByIdDoctor, listPrescriptionByIdPatient} = require('../controllers/PrescriptionController')
const router = Router()

router.post('/prescription/insert', verifyTokenDoctor,insertPrescription)
router.put('/prescription/update/:id-prescription', verifyTokenDoctor,updatePrescription)
router.get('/prescription/listprescriptions/doctor/:id-doctor', verifyTokenDoctor,listPrescriptionByIdDoctor)
router.get('/prescription/listprescriptions/patient/:id-patient', verifyToken,listPrescriptionByIdPatient)

module.exports = router