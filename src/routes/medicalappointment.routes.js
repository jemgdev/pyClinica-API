const { Router } = require('express')
const verifyTokenDoctor = require('../middlewares/TokenVerifyDoctor')
const verifyToken = require('../middlewares/TokenVerify')
const { listMedicalAppo, insertMedicAppo,deleteMedicalAppointment,updateMedicappo,listMedicAppoIdDoctor,listMedicAppoByIdPatient} = require('../controllers/MedicalappointmentController')
const router = Router()
router.get('/medicalappointment/listmedicalappointment', listMedicalAppo)
router.post('/medicalappointment/insertmedicalappointment/:id-schedule', insertMedicAppo)
router.delete('/medicalappointment/deletemedicalappointment/:medicalappoid',verifyToken, deleteMedicalAppointment)
router.put('/medicalappointment/updatemedicalappointment/:medicalappoid',verifyTokenDoctor, updateMedicappo)
router.get('/medicalappointment/listmedicalappointmentbyid/doctor/:id-doctor', verifyTokenDoctor, listMedicAppoIdDoctor)
router.get('/medicalappointment/listmedicalappointmentbyid/patient/:id-patient', verifyToken, listMedicAppoByIdPatient)

module.exports = router