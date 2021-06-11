const { Router } = require('express')
const { listByPatientId, listByDoctortId } = require('../controllers/MedicalHistoryController')
const verifyToken = require('../middlewares/TokenVerify')
const verifyTokenDoctor = require('../middlewares/TokenVerifyDoctor')
const router = Router()

router.get('/medicalhistory/listpatient', verifyToken, listByPatientId)
router.get('/medicalhistory/listdoctor', verifyTokenDoctor, listByDoctortId)

module.exports = router