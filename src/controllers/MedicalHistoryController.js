const mongoose = require('mongoose')
const Patient = require('../models/Patient')
const Doctor = require('../models/Doctor')

const medicalHistoryController = {}

medicalHistoryController.listByPatientId = async (req, res) => {

    try {
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
    } catch (error) {
        console.log(error)
    }
    
}

medicalHistoryController.listByDoctortId = async (req, res) => {

    try {
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
                        date: '$medicalHistories.date',
                        detail: '$medicalHistories.description'
                    }
                }
            ]
        )
    
        res.status(200).json(medicalHistories)
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = medicalHistoryController