const Patient = require('../models/Patient')
const bcrypt = require('bcrypt')

const patientController = {}

const handleErrors = (error) => {

    console.log(error.message, error.code)

    let errors = { email: '', password: '' }

    if (error.code === 11000) {
        errors.email = 'Email already exists'
    }

    if (error._message === 'patient validation failed') {
        errors.email = 'Wrong email'
    }

    if (error.message === 'Password is wrong') {
        errors.password = 'Password is wrong'
    }

    return errors

}

patientController.register = async (req, res) => {

    const { email, password, confirmPassword } = req.body

    if (password === confirmPassword) {

        const newPatient = new Patient({

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
        
            if (patientFound) {
    
                if (await Patient.login(password, patientFound.password)) {
        
                    res.status(200).json({
                        status: true
                    })
                } 
                else {
        
                    res.status(200).json({
                        status: false
                    })
                }
            }
        } catch (error) {
            
            res.status(404).json({
                error: handleErrors(error)
            })
        }
    }
    else {

        res.status(404).json({
            error: 'Email is not registered' 
        })
    }
}

module.exports = patientController