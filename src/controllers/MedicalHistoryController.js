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
            availability: true,
        })

        res.status(201).json(promises[2])

    } catch (error) {
        
        res.status(404).json({
            message: `Hubo un error con la inserción del historial médico: ${error.message}`
        })
    }
    
}

medicalHistoryController.listByPatientId = async (req, res) => {

    const medicalHistories = await Patient.aggregate(
        [
            {
                $match: {
                    _id: mongoose.Types.ObjectId(req.id)
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
                    name: '$doctor.name',
                    fatherLastName: '$doctor.surname_p',
                    motherLastName: '$doctor.surname_m',
                    avatar: '$doctor.avatar',
                    _id: "$medicalHistories._id",
                    date: '$medicalHistories.date'
                }
            }
        ]
    )

    res.status(200).json(medicalHistories)
}

medicalHistoryController.listByDoctortId = async (req, res) => {

    const medicalHistories = await Doctor.aggregate(
        [
            {
                $match: {
                    _id: mongoose.Types.ObjectId(req.id)
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
                    name: '$patient.name',
                    fatherLastName: '$patient.fatherLastName',
                    motherLastName: '$patient.motherLastName',
                    avatar: '$patient.avatar',
                    _id: "$medicalHistories._id",
                    date: '$medicalHistories.date'
                }
            }
        ]
    )

    res.status(200).json(medicalHistories)
}

module.exports = medicalHistoryController