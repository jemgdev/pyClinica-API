const Prescription = require('../models/Prescription')
const History =require('../models/MedicalHistory')
const MedicalHistory = require('../models/MedicalHistory')
const MedicalAppointment = require('../models/Medicalappointment')
const Patient = require('../models/Patient')
const Doctor = require('../models/Doctor')
const Schedule = require('../models/Schedule')
const mongoose = require('mongoose')

const PrescriptionController = {}

//Insertar Recetas Medicas
PrescriptionController.insertPrescription = async (req, res) => {

    const { idmedicalappointment } = req.params

    const prescriptions = req.body

    const medicalAppointmentDeleted = await MedicalAppointment.findByIdAndDelete(idmedicalappointment)

    const newMedicalHistory = new MedicalHistory({
        ...medicalAppointmentDeleted._doc,
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
                }),

                await Patient.findByIdAndUpdate(medicalAppointmentDeleted.patient, {
                    $pull: {
                        medicalAppointments: medicalAppointmentDeleted._id
                    },
                    $addToSet: {
                        medicalHistories: medicalAppointmentDeleted._id
                    }
                }),

                await Schedule.findByIdAndUpdate(medicalAppointmentDeleted.schedule, {
                    availability: true,
                }),

                await newMedicalHistory.save()
            ]
        )

        prescriptions.map(async prescription => {

            const newPrescription = new Prescription({
                doctor: req.id,
                patient: prescription.idPatient,
                detail: prescription.detail,
                date: new Date(prescription.date)
            })

            const prescriptionSaved = await newPrescription.save()
            
            await MedicalHistory.findByIdAndUpdate(idmedicalappointment, {
                $addToSet: {
                    prescription: prescriptionSaved._id
                }
            })
            
        })

        res.status(201).json({
            message: 'Receta medica guardado exitosamente'
        })

    } catch (error) {
        
        console.log(error.message)

        res.status(200).json({
            message: `Hubo un error: ${error.message}`
        })
    }

}

//Actualizar las recetas medicas
PrescriptionController.updatePrescription = async (req, res) => {
    const {detail} = req.body
    const {idprescription} = req.params

    try{
        await Prescription.findByIdAndUpdate(idprescription, {
            detail
        },{
            new: true
        })
        
        res.status(201).json({
            message: 'La receta medica ha sido actualizada con exito'
        })
    }catch(error){
        res.status(201).json({
            error: 'La receta medica no ha sido actualizada'
        })
    } 
}

//Listado de Citas por Historial
PrescriptionController.listPrescriptionByIdHistory = async (req, res) => {
    const {idhistory} = req.params

    const prescriptionFound = await History.aggregate(
        [
            {
                $match: {
                    _id : mongoose.Types.ObjectId(idhistory)
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
                $project: {
                    _id: '$prescription._id', 
                    detail: '$prescription.detail', 
                    date: '$prescription.date' 
                }   
            }
        ]
    )

    res.status(201).json(prescriptionFound)
}

module.exports = PrescriptionController