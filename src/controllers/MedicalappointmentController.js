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
    const { patient, doctor, date, description, price } = req.body;
    const medicalappointmentSchema = new Medicalappointment({
        patient,
        doctor,
        date,
        description,
        price,
        schedule: idSchedule
    });
    try {
        const medicalCreate = await medicalappointmentSchema.save();

        const doctorUpdated = await Doctor.findByIdAndUpdate(doctor,
            {
                $addToSet: {
                    medicalAppointment: medicalCreate._id,

                },
            },
            {
                new: true,
            }
        );
        const patientUpdated = await Patient.findByIdAndUpdate(patient,
            {
                $addToSet: {
                    medicalAppointments: medicalCreate._id,
                },
            },
            {
                new: true,
            }
        );
        const scheduleUpdated = await Schedule.findByIdAndUpdate(idSchedule,
            {
                availability: false
            },
            {
                new: true,
            }
        );

        res.json({
            medicalCreate,
            doctorUpdated,
            patientUpdated,
            scheduleUpdated
        });

    } catch (error) {
        console.log(error);
    }
};

//eliminar cita medica
MedicalappointmentController.deleteMedicalAppointment = async (req, res) => {
    const { medicalappoid } = req.params

    try {
        const MedicalappointmentFound = await Medicalappointment.findByIdAndDelete(medicalappoid)

        const doctorUpdated = await Doctor.findByIdAndUpdate(MedicalappointmentFound.doctor, {
            $pull: {
                medicalAppointment: MedicalappointmentFound._id
            }
        }, {
            new: true
        })
        const patientUpdated = await Patient.findByIdAndUpdate(MedicalappointmentFound.patient, {
            $pull: {
                medicalAppointments: MedicalappointmentFound._id
            }
        }, {
            new: true
        })

        res.status(201).json({
            message: 'Medical Appointment has been deleted',
            MedicalappointmentFound,
            doctorUpdated,
            patientUpdated
        })
    } catch (error) {
        res.status(201).json({
            error: 'Medical Appointment has not been deleted',
        })
    }
};

//actualizar cita medica por id por parametro y cambios enviado en json
MedicalappointmentController.   updateMedicappo = async (req, res) => {
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
                    patient: '$patient.name',
                    patient_p: '$patient.fatherLastName',
                    patient_m: '$patient.motherLastName',
                    _id: "$medicalAppointment._id",
                    date: '$medicalAppointment.date'
                }
            }
        ]
    )

    res.status(201).json({
        message: 'Doctor found',
        doctorFound
    })
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
                    doctor_p: '$doctor.surname_p',
                    doctor_m: '$doctor.surname_m',
                    _id: "$medicalAppointments._id",
                    date: '$medicalAppointments.date'
                }
            }
        ]
    )

    res.status(201).json({
        message: 'Patient found',
        patientFound
    })
}

module.exports = MedicalappointmentController;