const MedicalAppointment = require('../models/Medicalappointment')
const MedicalHistory = require('../models/MedicalHistory')
const Patient = require('../models/Patient')
const Doctor = require('../models/Doctor')

const medicalHistoryController = {}

medicalHistoryController.insertMedicalHistory = async (req, res) => {

    const { idprescription, idmedicalappointment } = req.params

    const medicalAppointmentDeleted = await MedicalAppointment.findByIdAndDelete(idmedicalappointment)

    const newMedicalHistory = new MedicalHistory({
        ...medicalAppointmentDeleted._doc,
        prescription: idprescription
    })

    const promises = await Promise.all(
        [
            await Doctor.findByIdAndUpdate(medicalAppointmentDeleted.doctor, {
                $pull: {
                    medicalAppointment: medicalAppointmentDeleted._id
                }
            }, {
                new: true
            }),
            await Patient.findByIdAndUpdate(medicalAppointmentDeleted.patient, {
                $pull: {
                    medicalAppointments: medicalAppointmentDeleted._id
                }
            }, {
                new: true
            }),
            await newMedicalHistory.save()
        ]
    )

    res.status(201).json(promises[2])
}

module.exports = medicalHistoryController