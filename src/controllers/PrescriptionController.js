const Prescription = require('../models/Prescription')

const PrescriptionController = {}

PrescriptionController.insertPrescription = async (req, res) => {
    const { doctor, patient, detail } = req.body

    const newPrescription = new Prescription({
        doctor,
        patient,
        detail
    })

    try {
        const prescriptionSaved = await newPrescription.save()

        res.status(201).json({
            message: 'Prescription saved',
            prescriptionSaved
        })
    } catch (error) {
        res.status(401).json({
            message: 'Unsaved prescription'
        })
    }
}

PrescriptionController.updatePrescription = async (req, res) => {
    const {doctor, patient, detail} = req.body
    const {idPrescription} = req.params

    try{
        const prescriptionUpdated = await Prescription.findByIdAndUpdate(idPrescription, {
            doctor,
            patient,
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
            message: 'Prescription has not been updated'
        })
    } 
}

module.exports = PrescriptionController