const { Router } = require('express')
const verifyTokenDoctor = require('../middlewares/TokenVerifyDoctor')
const verifyToken = require('../middlewares/TokenVerify')
const { insertPrescription , updatePrescription, listPrescriptionByIdHistory} = require('../controllers/PrescriptionController')
const router = Router()

router.post('/prescription/insert/:idmedicalappointment', verifyTokenDoctor,insertPrescription)
router.put('/prescription/update/:idprescription', verifyTokenDoctor,updatePrescription)
router.get('/prescription/listprescriptions-patient/:idhistory', verifyToken, listPrescriptionByIdHistory)  
router.get('/prescription/listprescriptions-doctor/:idhistory', verifyTokenDoctor, listPrescriptionByIdHistory) 

module.exports = router