const Prescription = require('../models/Prescription')
const Patient = require('../models/Patient')
const Doctor = require('../models/Doctor')
const mongoose = require('mongoose')

const PrescriptionController = {}

//Insertar Recetas Medicas
PrescriptionController.insertPrescription = async (req, res) => {
    const { doctor, patient, detail } = req.body

    const newPrescription = new Prescription({
        doctor,
        patient,
        detail
    })

    try {
        const prescriptionSaved = await newPrescription.save()

        const patientUpdated = await Patient.findByIdAndUpdate(patient,{
            $addToSet:{
                prescription: prescriptionSaved._id
            }
        },{
            new: true
        })

        const doctorUpdated = await Doctor.findByIdAndUpdate(doctor, {
            $addToSet: {
                prescription: prescriptionSaved._id
            }
        },{
            new: true
        })

        res.status(201).json({
            message: 'Prescription saved',
            prescriptionSaved,
            patientUpdated,
            doctorUpdated
        })
    } catch (error) {
        res.status(401).json({
            message: 'Unsaved prescription'
        })
    }
}

//Actualizar las recetas medicas
PrescriptionController.updatePrescription = async (req, res) => {
    const {detail} = req.body
    const {idPrescription} = req.params

    try{
        const prescriptionUpdated = await Prescription.findByIdAndUpdate(idPrescription, {
            detail
        },{
            new: true
        })
        
        res.status(201).json({
            message: 'Prescription has been updated',
            prescriptionUpdated
        })
    }catch(error){
        res.status(201).json({
            error: 'Prescription has not been updated'
        })
    } 
}

//Listado de Citas por Doctor
PrescriptionController.listPrescriptionByIdDoctor = async (req, res) => {
    const {iddoctor} = req.params

    const doctorFound = await Doctor.aggregate(
        [
            {
                $match: {
                    _id : mongoose.Types.ObjectId(iddoctor)
                }   
            },
            {
                $lookup: {
                    from: 'prescriptions',  
                    localField: 'prescription', 
                    foreignField: '_id', 
                    as: 'prescription' 
                }    
            },
            {
                $unwind: '$prescription'
            },
            {
                $lookup: {
                    from: 'patients',  
                    localField: 'patient', 
                    foreignField: 'patients._id', 
                    as: 'patient' 
                }    
            },
            {
                $unwind: '$patient'
            },
            {
                $project: {
                    patient: '$patient.email', 
                    detail: '$prescription.detail', 
                    date: '$prescription.date' 
                }   
            }
        ]
    )

    res.status(201).json({
        message: 'Doctor found',
        doctorFound
    })
}

//Listado de Citas por Paciente
PrescriptionController.listPrescriptionByIdPatient = async (req, res) => {
    const {idpatient} = req.params

    const patientFound = await Patient.aggregate(
        [
            {
                $match: {
                    _id : mongoose.Types.ObjectId(idpatient)
                }   
            },
            {
                $lookup: {
                    from: 'prescriptions',  
                    localField: 'prescription', 
                    foreignField: '_id', 
                    as: 'prescription' 
                }    
            },
            {
                $unwind: '$prescription' 
            },
            {
                $lookup: {
                    from: 'doctors',  
                    localField: 'doctor', 
                    foreignField: 'doctors._id', 
                    as: 'doctor' 
                }    
            },
            {
                $unwind: '$doctor'
            },
            {
                $project: {
                    doctor: '$doctor.name', 
                    detail: '$prescription.detail', 
                    date: '$prescription.date' 
                }   
            }
        ]
    )

    res.status(201).json({
        message: 'Doctor found',
        patientFound
    })
}


module.exports = PrescriptionController