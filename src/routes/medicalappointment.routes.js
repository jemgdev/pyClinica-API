const { Router } = require('express')
const { MedicalAppoList, insertMedicAppo } = require('../controllers/MedicalappointmentController')
const router = Router()

router.get('/medicalappointment', MedicalAppoList)
router.post('/medicalappointment/:patient/:doctor/:date/:description/:price/:prescription/:status', insertMedicAppo)

module.exports = router