const Prescription = require('../models/Prescription')
const History =require('../models/MedicalHistory')
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
        await newPrescription.save()
        res.status(201).json({
            message: 'La receta medica ha sido creada con exito'
        })
    } catch (error) {
        res.status(401).json({
            message: 'La receta medica no ha sido creada'
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
    console.log(idhistory)
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
                $project: {
                    _id: '$prescription._id', 
                    detail: '$prescription.detail', 
                    date: '$prescription.date' 
                }   
            }
        ]
    )

    res.status(201).json({
        _id: prescriptionFound[0]._id[0], 
        detail: prescriptionFound[0].detail[0], 
        date: prescriptionFound[0].date[0]
    })
}

module.exports = PrescriptionController