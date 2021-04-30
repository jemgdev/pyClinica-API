const Medicalappointment=require('../models/Medicalappointment')
const MedicalappointmentController= {}


MedicalappointmentController.MedicalAppoList = async (req, res) => {
    const MedicalappointmentFound = await Medicalappointment.find()
    console.log(MedicalappointmentFound)
    res.json(MedicalappointmentFound)
}

