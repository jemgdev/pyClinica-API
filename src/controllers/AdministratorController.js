const Administrator = require('../models/Administrator')
const Specialty = require('../models/Specialty')
const Campus = require('../models/Campus')
const Doctor = require('../models/Doctor')


const AdministratorController = {}
AdministratorController.administratorList = async (req, res) => {
    
    const administratorFound = await Administrator.find()
    console.log(administratorFound)
    res.json(administratorFound)
}

AdministratorController.insertAdministrator = async (req, res) => {
    
    const { name,surname_p,surname_m, mail,password,phone,dni,gender, age} = req.params   
    console.log(name)
    const administratorSchema = new Administrator({
        name,
        surname_p,
        surname_m,
        mail,
        password,
        phone,
        dni,
        gender,
        age
    })
    try {
    const administratorCreate= await administratorSchema.save();
    console.log(administratorCreate)
    res.json(administratorCreate)
    } catch (error) {
        console.log(error)
    }
}
AdministratorController.insertCampus = async(req,res) =>{
    const {department,province,district,direction} = req.params   
    const campusSchema = new Campus({
        department,
        province,
        district,
        direction
    })
    try {
    const campusCreate= await campusSchema.save();
    res.json(campusCreate)
    } catch (error) {
        console.log(error)
    }
}

AdministratorController.insertSpecialty = async (req,res)=>{
    const { name,availableHours,campus,doctors} = req.params   
    
    const especialitySchema = new Specialty({
        name,
        availableHours,
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

AdministratorController.insertDoctor = async(req,res) =>{
    const {name,surname_p,surname_m,email,password,phone,dni,age,gender,specialty} = req.params   
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

AdministratorController.updateSpecialty = async(req,res) =>{
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



/*router.put('/update-nota/:id/:idUser', async (req, res) => {

    const {id, idUser} = req.params

    const newNota = await notas.findByIdAndUpdate(id, {
        $addToSet: {
            user: idUser
        }
    }, {
        new: true
    })

    res.json(newNota)
})
/*
AdministratorController.updateEspecialidad = async(req,res) =>{

}

router.put('/update-nota/:id/:idUser', async (req, res) => {

    const {id, idUser} = req.params

    const newNota = await notas.findByIdAndUpdate(id, {
        $addToSet: {
            user: idUser
        }
    }, {
        new: true
    })

    res.json(newNota)
})

router.put('/delete-one-user-nota/:id/:idUser', async (req, res) => {

    const {id, idUser} = req.params

    const newNota = await notas.findByIdAndUpdate(id, {
        $pull: {
            user: idUser
        }
    }, {
        new: true
    })

    res.json(newNota)
})

*/






module.exports = AdministratorController