const Medicalappointment = require('../models/Medicalappointment')
const Patient = require('../models/Patient')
const Doctor = require('../models/Doctor')
const Schedule = require("../models/Schedule")
const mongoose = require('mongoose')
const MedicalappointmentController = {}

//Listar Cita medica
MedicalappointmentController.listMedicalAppo = async (req, res) => {
    const MedicalappointmentFound = await Medicalappointment.find()
    console.log(MedicalappointmentFound)
    res.json(MedicalappointmentFound)
}

//Insertar cita medica
MedicalappointmentController.insertMedicAppo = async (req, res) => {

    const  idSchedule  = req.params.idschedule
    const { doctor, description, price, status } = req.body;
    const medicalappointmentSchema = new Medicalappointment({

        patient: req.id,
        doctor,
        description,
        price,
        status,
        schedule: idSchedule
    })

    try {
        const medicalCreate = await medicalappointmentSchema.save()

        await Promise.all([
            await Doctor.findByIdAndUpdate(doctor,
                {
                    $addToSet: {
                        medicalAppointment: medicalCreate._id,
    
                    },
                },
                {
                    new: true,
                }
            ),
            await Patient.findByIdAndUpdate(req.id,
                {
                    $addToSet: {
                        medicalAppointments: medicalCreate._id,
                    },
                },
                {
                    new: true,
                }
            ),
            await Schedule.findByIdAndUpdate(idSchedule,
                {
                    availability: false
                },
                {
                    new: true,
                }
            )
        ])
        res.json({
            message: 'Cita medica creado correctamente',
        })

    } catch (error) {
        console.log(error);
    }
};

//eliminar cita medica
MedicalappointmentController.deleteMedicalAppointment = async (req, res) => {

    const { medicalappoid } = req.params

    try {
        const MedicalappointmentFound = await Medicalappointment.findByIdAndDelete(medicalappoid)

        await Promise.all([
            await Doctor.findByIdAndUpdate(MedicalappointmentFound.doctor, {
                $pull: {
                    medicalAppointment: MedicalappointmentFound._id
                }
            }, {
                new: true
            }),
            await Patient.findByIdAndUpdate(MedicalappointmentFound.patient, {
                $pull: {
                    medicalAppointments: MedicalappointmentFound._id
                }
            }, {
                new: true
            })
        ])
        

        res.status(201).json({
            message: 'Cita medica eliminado',
        })
    } catch (error) {
        res.status(200).json({
            message: 'Cita medica no ha sido eliminado',
        })
    }
};

//actualizar cita medica por id por parametro y cambios enviado en json
MedicalappointmentController.updateMedicappo = async (req, res) => {
    const medicalappoid = req.params.medicalappoid;
    try {
        const updateFound = await Medicalappointment.findOneAndUpdate({ _id: medicalappoid }, { $set: req.body }, { new: true });
        res.json(updateFound);
    } catch (error) {
        console.log(error);
    }
};

//Listado de Citas medicas por Doctor
MedicalappointmentController.listMedicAppoIdDoctor = async (req, res) => {

    const doctorFound = await Doctor.aggregate(
        [
            {
                $match: {
                    _id: mongoose.Types.ObjectId(req.id)
                }
            },
            {
                $lookup: {
                    from: 'medicalappointments',
                    localField: 'medicalAppointment',
                    foreignField: '_id',
                    as: 'medicalAppointment'
                }
            },
            {
                $unwind: '$medicalAppointment'
            },
            {
                $lookup: {
                    from: 'patients',
                    localField: 'medicalAppointment.patient',
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
                    _id: "$medicalAppointment._id",
                    date: '$medicalAppointment.date'
                }
            }
        ]
    )

    res.status(201).json(doctorFound)
}

//Listado de Citas medicas por Paciente
MedicalappointmentController.listMedicAppoByIdPatient = async (req, res) => {

    const patientFound = await Patient.aggregate(
        [
            {
                $match: {
                    _id: mongoose.Types.ObjectId(req.id)
                }
            },
            {
                $lookup: {
                    from: 'medicalappointments',
                    localField: 'medicalAppointments',
                    foreignField: '_id',
                    as: 'medicalAppointments'
                }
            },
            {
                $unwind: '$medicalAppointments'
            },
            {
                $lookup: {
                    from: 'doctors',
                    localField: 'medicalAppointments.doctor',
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
                    fatherLastName: '$doctor.surname_p',
                    motherLastName: '$doctor.surname_m',
                    avatar: '$doctor.avatar',
                    _id: "$medicalAppointments._id",
                    date: '$medicalAppointments.date'
                }
            }
        ]
    )

    res.status(201).json(patientFound)
}

module.exports = MedicalappointmentController;