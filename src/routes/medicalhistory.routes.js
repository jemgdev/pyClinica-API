const { Router } = require('express')
const { insertMedicalHistory, listByPatientId, listByDoctortId } = require('../controllers/MedicalHistoryController')
const verifyToken = require('../middlewares/TokenVerify')
const verifyTokenDoctor = require('../middlewares/TokenVerifyDoctor')
const router = Router()

// router.get('/medicalhistory/patient-list/:idpatient', register)
router.post('/medicalhistory/create/:idprescription/:idmedicalappointment', verifyTokenDoctor,insertMedicalHistory)
router.get('/medicalhistory/listpatient', verifyToken, listByPatientId)
router.get('/medicalhistory/listdoctor', verifyTokenDoctor, listByDoctortId)

module.exports = router