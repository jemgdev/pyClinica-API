const Doctor = require('../models/Doctor')
const jwt = require('jsonwebtoken')
const DoctorController = {}
const Specialty = require('../models/Specialty')
const { Mongoose } = require('mongoose')
const mongoose = require('mongoose')

//Insertar un Doctor
DoctorController.insertDoctor = async (req, res) => {
    const { name, surname_p, surname_m, email, password, phone, dni, age, gender, specialty } = req.body
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
        const doctorCreate = await doctorSchema.save();
        res.json(doctorCreate)
    } catch (error) {
        console.log(error)
    }
}


//Actualizar los datos del Doctor
DoctorController.updateDoctorById = async (req, res) => {
    const {name, surname_p, surname_m, email, password, phone, dni, age} = req.body

    const {idDoctor} = req.params

    try{
        const doctorUpdated = await Doctor.findByIdAndUpdate(idDoctor, {
            name,
            surname_p,
            surname_m,
            email,
            password,
            phone,
            dni,
            age
        },{
            new: true
        })

        res.status(201).json(doctorUpdated)

    }catch(error){
        res.status(500).json({
            message: 'There was an error in the user update'
        })
    }
}


//Logueo del Doctor
DoctorController.login = async (req, res) => {
    const {email, password} = req.body

    const doctorFound = await Doctor.find({ email })
    
    if(doctorFound){
        try{
            if(await Doctor.login(password, doctorFound[0].password)){
               
                const token = await jwt.sign({id: doctorFound[0]._id}, process.env.SECRET_KEY, {

                    expiresIn: 60 * 60 * 24

                })
                

                res.status(200).json({
                    message: 'token created',
                    token
                })
                
            }else{

                res.status(200).json({
                    message: 'token has not been created'
                })
            }

        }catch(error){
       
        }

    }else{
        res.status(404).json({
            error: 'Email is not registered'
        })
    }
}


//Listados de Doctores por especialidad
DoctorController.listDoctorBySpecialty = async (req, res) => {

    const {idSpecialty} = req.params

    const specialtyFound = await Specialty.aggregate(
        [
            {
                $match: {
                    _id : mongoose.Types.ObjectId(idSpecialty)
                }
            },
            {
                $lookup: {
                    from: 'doctors',  //Collections con la que se unira
                    localField: 'doctors', //Atributo de la collecion Specialty que hara el match
                    foreignField: '_id', //Id de la collections doctors que hara match
                    as: 'doctors' //nombre del nuevo atributo(arreglo)
                }    
            },
            {
                $unwind: '$doctors'  //separar los doctores en diferentes objetos segun la cantidad de matches
            },
            {
                //Elegir que atributos mostrar
                $project: {
                    name: '$doctors.name', 
                    avatar: '$doctors.avatar', 
                    specialty: '$name' 
                }    
            }
        ]
    )

    res.status(201).json({
        message: "Specialty found",
        specialtyFound
    })

}

module.exports = DoctorController