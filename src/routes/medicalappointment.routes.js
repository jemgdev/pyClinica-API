const { Router } = require('express')
const verifyTokenDoctor = require('../middlewares/TokenVerifyDoctor')
const verifyToken = require('../middlewares/TokenVerify')
const { listMedicalAppo, insertMedicAppo,deleteMedicalAppointment,updateMedicappo,listMedicAppoIdDoctor,listMedicAppoByIdPatient} = require('../controllers/MedicalappointmentController')
const router = Router()
router.get('/medicalappointment/listmedicalappointment', listMedicalAppo)
router.post('/medicalappointment/insertmedicalappointment/:idschedule', verifyToken,insertMedicAppo)
//router.delete('/medicalappointment/deletemedicalappointment/:medicalappoid',verifyToken, deleteMedicalAppointment)
router.put('/medicalappointment/updatemedicalappointment/:medicalappoid',verifyTokenDoctor, updateMedicappo)
router.get('/medicalappointment/listmedicalappointmentbyid/doctor/:iddoctor', verifyTokenDoctor, listMedicAppoIdDoctor)
router.get('/medicalappointment/listmedicalappointmentbyid/patient/:idpatient', verifyToken, listMedicAppoByIdPatient)

module.exports = router