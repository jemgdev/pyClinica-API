const { Router } = require('express')
const { listMedicalAppo, insertMedicAppo } = require('../controllers/MedicalappointmentController')
const router = Router()
router.get('/medicalappointment/listMedicalAppoList', listMedicalAppo)
router.post('/campus/insertMedicAppo', insertMedicAppo)
router.delete('/campus/deleteMedicappo/:campusId', deleteMedicappo)
router.put('/campus/updateMedicappo/:campusId', updateMedicappo)
module.exports = router