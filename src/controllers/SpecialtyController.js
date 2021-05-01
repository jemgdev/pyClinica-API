const Specialty = require('../models/Specialty')

const SpecialtyController = {}

SpecialtyController.listSpecialty = async (req, res) => {

    const specialtyFound = await Specialty.find()

    res.json(specialtyFound)
}

SpecialtyController.insertSpecialty = async (req,res)=>{
    const { name,availableHours,price,campus,doctors} = req.body   
    
    const especialitySchema = new Specialty({
        name,
        availableHours,
        price,
        campus,
        doctors
    })
    try {
    const especialityCreate= await especialitySchema.save();
    res.json(especialityCreate)
    } catch (error) {
        console.log(error)
    }
}

SpecialtyController.updateSpecialty = async(req,res) =>{
    const {idspecialty,iddoctor} = req.params
    console.log(idspecialty,iddoctor)
    const updateEspecialty = await Specialty.findOneAndUpdate(idspecialty, {
        $addToSet: {
            doctor: iddoctor
        }
    }, {
        new: true
    })
    res.json(updateEspecialty)
}

module.exports = SpecialtyController