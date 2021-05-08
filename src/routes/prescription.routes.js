const { Router } = require('express')
const verifyTokenDoctor = require('../middlewares/TokenVerifyDoctor')
const verifyToken = require('../middlewares/TokenVerify')
const { insertPrescription , updatePrescription, listPrescriptionByIdDoctor, listPrescriptionByIdPatient} = require('../controllers/PrescriptionController')
const router = Router()

router.post('/prescription/insert', verifyTokenDoctor,insertPrescription)
router.put('/prescription/update/:idprescription', verifyTokenDoctor,updatePrescription)
router.get('/prescription/listprescriptions/doctor/:iddoctor', verifyTokenDoctor,listPrescriptionByIdDoctor)
router.get('/prescription/listprescriptions/patient/:idpatient', verifyToken,listPrescriptionByIdPatient)

module.exports = router