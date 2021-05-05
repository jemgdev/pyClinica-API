const Specialty = require('../models/Specialty')

const SpecialtyController = {}

// listar especialidad
SpecialtyController.listSpecialty = async (req, res) => {
    const specialtyFound = await Specialty.find()
    res.json(specialtyFound)
}

//insertar especialidad
SpecialtyController.insertSpecialty = async (req,res)=>{
    const {name,price,doctors} = req.body   
    
    const especialitySchema = new Specialty({
        name,
        price,
        doctors
    })
    try {
    const especialityCreate= await especialitySchema.save();
    res.json(especialityCreate)
    } catch (error) {
        console.log(error)
    }
}

//eliminar espeicalidad
SpecialtyController.deleteSpecialty = async (req, res) => {
    const idSpecialty = req.params.specialtyId;
    try {
      const deleteFound = await Specialty.remove({ _id: idSpecialty });
      res.json(deleteFound);
    } catch (error) {
      console.log(error);
    }
  };

// actualizar especialidad
SpecialtyController.updateSpecialty = async (req, res) => {
    const idSpecialty = req.params.specialtyId;
    const specialtySchema = new Specialty({
        name: req.body.name,
        price: req.body.price,
        doctors:req.body.doctors
    });
  
    try {
      const updateFound = await Specialty.findOneAndUpdate(idSpecialty, {$set: req.body},{ new: true });
      res.json(updateFound);
    } catch (error) {
      console.log(error);
    }
  };

  // Listar doctores de una especialidad
  SpecialtyController.ListOnlyDoctors = async (req, res) => {

  const idSpecialty = req.params.specialtyId;
  const listDoctor = await Specialty.findById(idSpecialty).populate('doctor')

  res.json(listDoctor)
}

module.exports = SpecialtyController