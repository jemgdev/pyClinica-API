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


//Eliminar las recetas medicas para el Doctor
PrescriptionController.deletePrescriptionByDoctor = async (req, res) => {
    const {idPrescription} = req.params

    try{
        const prescriptionFound = await Prescription.findById(idPrescription)

        const doctorUpdated = await Doctor.findByIdAndUpdate(prescriptionFound.doctor, {
            $pull: {
                prescription: prescriptionFound._id
            }
        }, {
            new: true
        })

        res.status(201).json({
            message: 'Prescription has been deleted',
            prescriptionFound,
            doctorUpdated
        })
    }catch(error){
        res.status(201).json({
            error: 'Prescription has not been deleted',
        })
    }
}


//Eliminar las recetas medicas para el paciente
PrescriptionController.deletePrescriptionByPaciente = async (req, res) => {
    const {idPrescription} = req.params

    try{
        const prescriptionDeleted = await Prescription.findByIdAndDelete(idPrescription)

        const patientUpdated = await Patient.findByIdAndUpdate(prescriptionDeleted.patient, {
            $pull: {
                prescription: prescriptionDeleted._id
            }
        }, {
            new: true
        })

        res.status(201).json({
            message: 'Prescription has been deleted',
            prescriptionDeleted,
            patientUpdated
        })
    }catch(error){
        res.status(201).json({
            error: 'Prescription has not been deleted',
        })
    }
}



//Listado de Citas por Doctor
PrescriptionController.listPrescriptionByIdDoctor = async (req, res) => {
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