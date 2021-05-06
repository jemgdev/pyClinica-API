const Doctor = require('../models/Doctor')
const jwt = require('jsonwebtoken')
const DoctorController = {}
const Specialty = require('../models/Specialty')
const mongoose = require('mongoose')

const handleErrors = (error) => {

    console.log(error.message, error.code)

    let errors = { name: '', surname_p: '', surname_m: '', email: '', password: '' }

    if (error.code === 11000) {
        errors.email = 'Email already exists'
    }

    if (error.errors.name) {
        errors.name = 'You must to have a name'
    }

    if (error.errors.surname_p) {
        errors.surname_p = 'You must to have a fatherLastName'
    }

    if (error.errors.surname_m) {
        errors.surname_m = 'You must to have a motherLastName'
    }

    if (error.errors.email) {
        errors.email = 'Wrong email'
    }

    if (error.message === 'Password is wrong') {
        errors.password = 'Password is wrong'
    }

    return errors
}

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
        
        const specialtyFound = await Specialty.findByIdAndUpdate(doctorCreate.specialty, {
            
            $addToSet:{
                doctors: doctorCreate._id
            }
        }, {
            new: true
        })

        res.json({
            doctorCreate,
            specialtyFound
        })
    } catch (error) {

        res.status(401).json({
            error: handleErrors(error)
        })
    }
}


DoctorController.listDoctors = async (req, res) => {

    const listDoctors = await Doctor.find()

    res.status(201).json({
        listDoctors
    })
}

DoctorController.deleteDoctors = async (req, res) => {

    const { idDoctor } = req.params

    try {

        const doctorDeleted = await Doctor.findByIdAndDelete(idDoctor)

        const specialtyFound = await Specialty.findByIdAndUpdate(doctorDeleted.specialty, {
            $pull: {
                doctors: doctorDeleted._id
            }
        },{
            new: true
        })

        res.status(201).json({
            message: 'Doctor deleted',
            doctorDeleted,
            specialtyFound
        })
    } catch (error) {

        res.status(201).json({
            message: 'Doctor has not been deleted'
        })
    }
}

//Actualizar los datos del Doctor
DoctorController.updateDoctorById = async (req, res) => {

    const { name, surname_p, surname_m, email, password, phone, dni, age } = req.body

    const { idDoctor } = req.params

    try {
        const doctorUpdated = await Doctor.findByIdAndUpdate(idDoctor, {
            name,
            surname_p,
            surname_m,
            email,
            password,
            phone,
            dni,
            age
        }, {
            new: true
        })

        res.status(201).json(doctorUpdated)

    } catch (error) {
        res.status(500).json({
            message: 'There was an error in the user update'
        })
    }
}


//Logueo del Doctor
DoctorController.login = async (req, res) => {

    const { email, password } = req.body

    const doctorFound = await Doctor.find({ email })

    if (doctorFound) {
        try {
            if (await Doctor.login(password, doctorFound[0].password)) {

                const token = await jwt.sign({ id: doctorFound[0]._id }, process.env.SECRET_KEY, {

                    expiresIn: 60 * 60 * 24

                })


                res.status(200).json({
                    message: 'token created',
                    token
                })

            } else {

                res.status(200).json({
                    message: 'token has not been created'
                })
            }

        } catch (error) {

        }

    } else {

        res.status(404).json({
            error: 'Email is not registered'
        })
    }
}


//Listados de Doctores por especialidad
DoctorController.listDoctorBySpecialty = async (req, res) => {

    const { idSpecialty } = req.params

    const specialtyFound = await Specialty.aggregate(
        [
            {
                $match: {
                    _id: mongoose.Types.ObjectId(idSpecialty)
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