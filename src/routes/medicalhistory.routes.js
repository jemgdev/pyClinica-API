const { Router } = require('express')
const { insertMedicalHistory } = require('../controllers/MedicalHistoryController')
const verifyToken = require('../middlewares/TokenVerify')
const router = Router()

// router.get('/medicalhistory/patient-list/:idpatient', register)
router.post('/medicalhistory/create/:idprescription/:idmedicalappointment', insertMedicalHistory)

module.exports = router