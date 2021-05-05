const { Router } = require('express')
const { listMedicalAppo, insertMedicAppo,deleteMedicappo,updateMedicappo } = require('../controllers/MedicalappointmentController')
const router = Router()
router.get('/medicalappointment/listMedicalAppo', listMedicalAppo)
router.post('/medicalappointment/insertMedicAppo', insertMedicAppo)
router.delete('/medicalappointment/deleteMedicappo/:medicalappoid', deleteMedicappo)
router.put('/medicalappointment/updateMedicappo/:medicalappoid', updateMedicappo)
module.exports = router