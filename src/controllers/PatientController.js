const Patient = require('../models/Patient')
const jwt = require('jsonwebtoken')

const patientController = {}

const handleErrors = (error) => {

    console.log(error.message, error.code)

    let errors = { name: '', fatherLastName: '', motherLastName: '', email: '', password: '' }

    if (error.code === 11000) {
        errors.email = 'Email already exists'
    }

    if (error.errors) {

        if (error.errors.name) {
            errors.name = 'You must to have a name'
        }

        if (error.errors.fatherLastName) {
            errors.fatherLastName = 'You must to have a fatherLastName'
        }
    
        if (error.errors.motherLastName) {
            errors.motherLastName = 'You must to have a motherLastName'
        }
    
        if (error.errors.email) {
            errors.email = 'Wrong email'
        }
    }

    if (error.message === 'Password is wrong') {
        errors.password = 'Password is wrong'
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

            const patientSaved = await newPatient.save()

            res.status(201).json(patientSaved)            
        } catch (error) {    
            
            res.status(401).json({
                error: handleErrors(error)
            })
        }

    } 
    else {
        
        res.status(401).json({
            error: 'Passwords are differents'
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
            error: 'Email is not registered' 
        })

    }
}

patientController.changePersonalInformation = async (req, res) => {

    const { name, fatherLastName, motherLastName, phoneNumber, dni, age, gender, civilStatus, department, province, district, address, addressReference } = req.body

    try {

        const patientUpdated = await Patient.findByIdAndUpdate(req.id, {

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
    
        res.status(201).json(patientUpdated)
        
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

            const patientUpdated = await Patient.findByIdAndUpdate(req.id, {
                password: await Patient.changePassword(newPassword)
            }, {
                new: true
            })
    
            res.status(201).json(patientUpdated)
        }
        else {
    
            res.status(404).json({
                error: 'Passwords are differents'
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