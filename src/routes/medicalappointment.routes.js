const { Router } = require('express')
const { MedicAppoList, insertMedicAppo } = require('../controllers/MedicalappointmentController')
const router = Router()

router.get('/Medicalappointment', MedicAppoList)
//router.post('/Medicalappointment/:patient/:doctor/:date/:description/:price/:prescription/:status', insertMedicAppo)

module.exports = router