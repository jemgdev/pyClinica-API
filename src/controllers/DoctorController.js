const Doctor = require('../models/Doctor')
const jwt = require('jsonwebtoken')
const DoctorController = {}
const Specialty = require('../models/Specialty')
const mongoose = require('mongoose')

const handleErrors = (error) => {

    console.log(error.message, error.code)

    let errors = { name: '', surname_p: '', surname_m: '', email: '', password: '' }

    if (error.code === 11000) {
        errors.email = 'El email ya existe'
    }

    if (error.errors) {
        
        if (error.errors.name) {
            errors.name = 'Tienes que ingresar un nombre'
        }
    
        if (error.errors.surname_p) {
            errors.surname_p = 'Tienes que ingresar un apellido paterno'
        }
    
        if (error.errors.surname_m) {
            errors.surname_m = 'Tienes que ingresar un apellido materno'
        }
    
        if (error.errors.email) {
            errors.email = 'Email erroneo'
        }
    }

    if (error.message === 'Password is wrong') {
        errors.password = 'La contraseña es incorrecta'
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
            message: 'El doctor ha sido registrado correctamente'
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

    const { iddoctor } = req.params

    try {

        const doctorDeleted = await Doctor.findByIdAndDelete(iddoctor)

        const specialtyFound = await Specialty.findByIdAndUpdate(doctorDeleted.specialty, {
            $pull: {
                doctors: doctorDeleted._id
            }
        },{
            new: true
        })

        res.status(201).json({
            message: 'El doctor ha sido eliminado correctamente'
        })
    } catch (error) {

        res.status(201).json({
            message: 'El doctor no ha sido eliminado'
        })
    }
}

//Actualizar los datos del Doctor
DoctorController.updateDoctorById = async (req, res) => {

    const { name, surname_p, surname_m, email, phone, dni, age } = req.body

    try {
        const doctorUpdated = await Doctor.findByIdAndUpdate(req.id, {
            name,
            surname_p,
            surname_m,
            email,
            phone,
            dni,
            age
        }, {
            new: true
        })

        res.status(201).json({
            message: 'El doctor ha sido actualizado con exito'
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            message: handleErrors(error)
        })
    }
}


//Logueo del Doctor
DoctorController.login = async (req, res) => {

    const { email, password } = req.body

    const doctorFound = await Doctor.findOne({ email })
    
    if (doctorFound) {

        try {

            if (await Doctor.login(password, doctorFound.password)) {

                const token = await jwt.sign({ id: doctorFound._id }, process.env.SECRET_KEY, {

                    expiresIn: 60 * 60 * 24

                })


                res.status(200).json({
                    message: 'El doctor se ha logueado con exito',
                    token
                })

            } else {

                res.status(200).json({
                    message: 'El token no ha sido creado'
                })
            }

        } catch (error) {

            res.status(404).json({
                message: handleErrors(error)
            })
        }

    } else {

        res.status(404).json({
            error: 'El email no esta registrado'
        })
    }
}


//Listados de Doctores por especialidad
DoctorController.listDoctorBySpecialty = async (req, res) => {

    const { idspecialty } = req.params

    const specialtyFound = await Specialty.aggregate(
        [
            {
                $match: {
                    _id: mongoose.Types.ObjectId(idspecialty)
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
                    surname_p: '$doctors.surname_p',
                    surname_m: '$doctors.surname_m',
                    avatar: '$doctors.avatar',
                    specialty: '$name'
                }
            }
        ]
    )

    res.status(201).json({
        specialtyFound
    })
}

DoctorController.changePassword = async (req, res) => {

    const { password, newPassword } = req.body

    const doctorfound = await Doctor.findById(req.id)

    try {
        
        if (await Doctor.login(password, doctorfound.password)) {

            const doctorUpdated = await Doctor.findByIdAndUpdate(req.id, {
                password: await Doctor.changePassword(newPassword)
            }, {
                new: true
            })
    
            res.status(201).json({
                message: 'La contraseña ha sido actualizado con exito'
            })
        }
        else {
    
            res.status(404).json({
                error: 'Las contraseñas son diferentes'
            })
        }
    } catch (error) {
        
        res.status(404).json({
            error: handleErrors(error)
        })
    }
}

DoctorController.getDoctorById = async (req, res) => {

    const doctorId = req.id

    const doctorFound = await Doctor.findById(doctorId, {
        medicalAppointments: 0,
        medicalHistories: 0,
        password: 0,
        createdAt: 0,
        updatedAt: 0
    })

    res.status(200).json(doctorFound)
}

module.exports = DoctorController