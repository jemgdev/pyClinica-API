const Medicalappointment=require('../models/Medicalappointment')
const Patient = require('../models/Patient')
const Doctor = require('../models/Doctor')
const Schedule = require("../models/Schedule")
const mongoose = require('mongoose')
const MedicalappointmentController= {}

//Listar Cita medica
MedicalappointmentController.listMedicalAppo = async (req, res) => {
    const MedicalappointmentFound = await Medicalappointment.find()
    console.log(MedicalappointmentFound)
    res.json(MedicalappointmentFound)
}

//Insertar cita medica
MedicalappointmentController.insertMedicAppo = async (req, res) => {
    const {idSchedule} = req.params
    const { patient, doctor, date, description, price, prescription, status } = req.body;
    const medicalappointmentSchema = new Medicalappointment({
        patient,
        doctor,
        date,
        description,
        price,
        prescription,
        status
    });
    try { 
        const medicalCreate = await medicalappointmentSchema.save();
        // aqui
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
                availability:false
            },
            {
              new: true,
            }
          );
        
        res.json(medicalCreate);
    } catch (error) {
        console.log(error);
    }
};

//eliminar cita medica por id
MedicalappointmentController.deleteMedicappo = async (req, res) => {
    const medicalappoid = req.params.medicalappoid;
    try {
        const deleteFound = await Medicalappointment.remove({ _id: medicalappoid });
        res.json(deleteFound);
    } catch (error) {
        console.log(error);
    }
};


//eliminar cita medica para doctor
MedicalappointmentController.deleteMedicalAppointmentByDoctor = async (req, res) => {
    const {medicalappoid} = req.params

    try{
        const MedicalappointmentFound = await Medicalappointment.findByIdAndUpdate(medicalappoid,{status:false})

        const doctorUpdated = await Doctor.findByIdAndUpdate(MedicalappointmentFound.doctor, {
            $pull: {
                medicalAppointment: MedicalappointmentFound._id
            },
        }, {
            new: true
        })
        
        res.status(201).json({
            message: 'Medical Appointment has been deleted',
            MedicalappointmentFound,
            doctorUpdated
        })
    }catch(error){
        res.status(201).json({
            error: 'Medical Appointment has not been deleted',
        })
    }
};

//eliminar cita para paciente
MedicalappointmentController.deleteMedicalAppointmentByPaciente = async (req, res) => {
    const {medicalappoid} = req.params

    try{
        const MedicalappointmentFound = await Medicalappointment.findByIdAndDelete(medicalappoid)

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
            patientUpdated
        })
    }catch(error){
        res.status(201).json({
            error: 'Medical Appointment has not been deleted',
        })
    }
};





//actualizar cita medica por id por parametro y cambios enviado en json
MedicalappointmentController.updateMedicappo = async (req, res) => {
    const medicalappoid = req.params.medicalappoid;
    const medicalappointmentSchema = new Medicalappointment({
        patient: req.body.patient,
        doctor: req.body.doctor,
        date: req.body.date,
        description: req.body.description,
        price: req.body.price,
        prescription: req.body.prescription,
        status: req.body.status
    });
    try {
        const updateFound = await Medicalappointment.findOneAndUpdate({ _id: medicalappoid }, {$set: req.body},{ new: true });
        res.json(updateFound);
    } catch (error) {
        console.log(error);
    }
};

//Listado de Citas medicas por Doctor
MedicalappointmentController.listMedicAppoIdDoctor = async (req, res) => {
    const {idDoctor} = req.params

    const doctorFound = await Doctor.aggregate(
        [
            {
                $match: {
                    _id : mongoose.Types.ObjectId(idDoctor)
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
    const {idPatient} = req.params

    const patientFound = await Patient.aggregate(
        [
            {
                $match: {
                    _id : mongoose.Types.ObjectId(idPatient)
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