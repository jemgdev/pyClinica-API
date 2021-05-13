const mongoose = require('mongoose')
const MedicalAppointment = require('../models/Medicalappointment')
const MedicalHistory = require('../models/MedicalHistory')
const Patient = require('../models/Patient')
const Doctor = require('../models/Doctor')
const Schedule = require('../models/Schedule')

const medicalHistoryController = {}

medicalHistoryController.insertMedicalHistory = async (req, res) => {

    const { idprescription, idmedicalappointment } = req.params

    const medicalAppointmentDeleted = await MedicalAppointment.findByIdAndDelete(idmedicalappointment)

    const newMedicalHistory = new MedicalHistory({
        ...medicalAppointmentDeleted._doc,
        prescription: idprescription
    })
    try {
        const promises = await Promise.all(
            [
                await Doctor.findByIdAndUpdate(medicalAppointmentDeleted.doctor, {
                    $pull: {
                        medicalAppointment: medicalAppointmentDeleted._id
                    },
                    $addToSet: {
                        medicalHistories: medicalAppointmentDeleted._id
                    }
                }, {
                    new: true
                }),
                await Patient.findByIdAndUpdate(medicalAppointmentDeleted.patient, {
                    $pull: {
                        medicalAppointments: medicalAppointmentDeleted._id
                    },
                    $addToSet: {
                        medicalHistories: medicalAppointmentDeleted._id
                    }
                }, {
                    new: true
                }),
                await newMedicalHistory.save(),               
            ]
        )
        await Schedule.findByIdAndUpdate(medicalAppointmentDeleted.schedule, {
            availability:true,
        })
        console.log(medicalAppointmentDeleted.schedule)
        res.status(201).json(promises[2])
    } catch (error) {
        console.log(error)
    }
    
}

medicalHistoryController.listByPatientId = async (req, res) => {

    const { idpatient } = req.params

    const medicalHistories = await Patient.aggregate(
        [
            {
                $match: {
                    _id: mongoose.Types.ObjectId(idpatient)
                }
            },
            {
                $lookup: {
                    from: 'medicalhistories',
                    localField: 'medicalHistories',
                    foreignField: '_id',
                    as: 'medicalHistories'
                }
            },
            {
                $unwind: '$medicalHistories'
            },
            {
                $lookup: {
                    from: 'doctors',
                    localField: 'medicalHistories.doctor',
                    foreignField: '_id',
                    as: 'doctor'
                }
            },
            {
                $unwind: '$doctor'
            },
            {
                $project: {
                    doctor: '$doctor.name',
                    doctor_p: '$doctor.surname_p',
                    doctor_m: '$doctor.surname_m',
                    _id: "$medicalHistories._id",
                    date: '$medicalHistories.date'
                }
            }
        ]
    )

    res.status(200).json(medicalHistories)
}

medicalHistoryController.listByDoctortId = async (req, res) => {

    const { idoctor } = req.params

    const medicalHistories = await Doctor.aggregate(
        [
            {
                $match: {
                    _id: mongoose.Types.ObjectId(idoctor)
                }
            },
            {
                $lookup: {
                    from: 'medicalhistories',
                    localField: 'medicalHistories',
                    foreignField: '_id',
                    as: 'medicalHistories'
                }
            },
            {
                $unwind: '$medicalHistories'
            },
            {
                $lookup: {
                    from: 'patients',
                    localField: 'medicalHistories.patient',
                    foreignField: '_id',
                    as: 'patient'
                }
            },
            {
                $unwind: '$patient'
            },
            {
                $project: {
                    patient: '$patient.name',
                    patient_p: '$patient.fatherLastName',
                    patient_m: '$patient.motherLastName',
                    _id: "$medicalHistories._id",
                    date: '$medicalHistories.date'
                }
            }
        ]
    )

    res.status(200).json(medicalHistories)
}

module.exports = medicalHistoryController