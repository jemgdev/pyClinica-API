const Patient = require('../models/Patient')
const jwt = require('jsonwebtoken')

const patientController = {}

const handleErrors = (error) => {

    console.log(error.message, error.code)

    let errors = { name: '', fatherLastName: '', motherLastName: '', email: '', password: '' }

    if (error.code === 11000) {
        errors.email = 'El email ya existe'
    }

    if (error.errors) {

        if (error.errors.name) {
            errors.name = 'Tienes que ingresar un nombre'
        }

        if (error.errors.fatherLastName) {
            errors.fatherLastName = 'Tienes que ingresar un apellido paterno'
        }
    
        if (error.errors.motherLastName) {
            errors.motherLastName = 'Tienes que ingresar un apellido materno'
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

patientController.register = async (req, res) => {

    const { name, fatherLastName, motherLastName, email, password, confirmPassword } = req.body

    if (password === confirmPassword) {

        const newPatient = new Patient({

            name,
            fatherLastName,
            motherLastName,
            email,
            password
        })

        try {

            await newPatient.save()

            res.status(201).json({
                message: 'El paciente ha sido registrado correctamente'
            })            
        } catch (error) {    
            
            res.status(401).json({
                error: handleErrors(error)
            })
        }

    } 
    else {
        
        res.status(401).json({
            error: 'Las contraseñas son diferentes'
        })
    }
}

patientController.login = async (req, res) => {

    const { email, password } = req.body

    const patientFound = await Patient.findOne({ email })

    if (patientFound) {

        try {

            if (await Patient.login(password, patientFound.password)) {

                const token = await jwt.sign({ id: patientFound._id }, process.env.SECRET_KEY, {

                    expiresIn: 60 * 60 * 24
                })
    
                res.status(200).json({
                    auth: true,
                    token
                })
            } 
            else {
    
                res.status(200).json({
                    auth: false
                })
            }
            
        } catch (error) {
            
            res.status(404).json({

                auth: false,
                error: handleErrors(error)            
            })
        }
    }
    else {

        res.status(404).json({
            auth: false,
            message: 'El email no esta registrado' 
        })

    }
}

patientController.changePersonalInformation = async (req, res) => {

    const { name, fatherLastName, motherLastName, phoneNumber, dni, age, gender, civilStatus, department, province, district, address, addressReference } = req.body

    try {

        await Patient.findByIdAndUpdate(req.id, {

            name,
            fatherLastName,
            motherLastName,
            phoneNumber,
            dni,
            age,
            gender,
            civilStatus,
            department,
            province,
            district,
            address,
            addressReference
        }, {

            new: true
        })
    
        res.status(201).json({
            message: 'Los datos del paciente han sido actualizados con éxito'
        })
        
    } catch (error) {

        res.status(500).json({
            error: handleErrors(error)
        })
    }
}

patientController.changePassword = async (req, res) => {

    const { password, newPassword } = req.body

    const patientFound = await Patient.findById(req.id)

    try {
        
        if (await Patient.login(password, patientFound.password)) {

            await Patient.findByIdAndUpdate(req.id, {
                password: await Patient.changePassword(newPassword)
            }, {
                new: true
            })
    
            res.status(201).json({
                message: 'La contraseña ha sido actualizada con éxito'
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

patientController.getPatientById = async (req, res) => {

    const patientId = req.id

    const patientFound = await Patient.findById(patientId, {
        medicalAppointments: 0,
        medicalHistories: 0,
        password: 0,
        createdAt: 0,
        updatedAt: 0
    })

    res.status(200).json(patientFound)
}

module.exports = patientController