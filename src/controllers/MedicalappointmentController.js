const Medicalappointment=require('../models/Medicalappointment')
const MedicalappointmentController= {}


MedicalappointmentController.listMedicalAppo = async (req, res) => {
    const MedicalappointmentFound = await Medicalappointment.find()
    console.log(MedicalappointmentFound)
    res.json(MedicalappointmentFound)
}

MedicalappointmentController.insertMedicAppo = async (req, res) => {
    const MedicalappointmentFoundd = await Medicalappointment.find()
    console.log(MedicalappointmentFoundd)
    res.json(MedicalappointmentFoundd)
}

module.exports = MedicalappointmentController