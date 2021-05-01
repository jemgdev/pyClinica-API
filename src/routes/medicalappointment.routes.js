const { Router } = require('express')
const { listMedicalAppo, insertMedicAppo } = require('../controllers/MedicalappointmentController')
const router = Router()

router.get('/medicalappointment/listMedicalAppoList', listMedicalAppo)
router.post('/medicalappointment/:patient/:doctor/:date/:description/:price/:prescription/:status', insertMedicAppo)

module.exports = router