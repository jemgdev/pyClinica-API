const Doctor = require('../models/Doctor')
const DoctorController = {}

DoctorController.insertDoctor = async(req,res) =>{
    const {name,surname_p,surname_m,email,password,phone,dni,age,gender,specialty} = req.body   
    const doctorSchema = new Doctor({
        name,
        surname_p,
        surname_m,
        email,
        password,
        phone,
        dni,
        age,
        gender,
        specialty
    })
    
    try {
    const doctorCreate= await doctorSchema.save();
    res.json(doctorCreate)
    } catch (error) {
        console.log(error)
    }
}

module.exports = DoctorController