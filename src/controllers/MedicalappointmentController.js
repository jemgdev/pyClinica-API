const Medicalappointment=require('../models/Medicalappointment')
const MedicalappointmentController= {}

//Listar Cita medica
MedicalappointmentController.listMedicalAppo = async (req, res) => {
    const MedicalappointmentFound = await Medicalappointment.find()
    console.log(MedicalappointmentFound)
    res.json(MedicalappointmentFound)
}

//Insertar cita medica
MedicalappointmentController.insertMedicAppo = async (req, res) => {
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

module.exports = MedicalappointmentController;