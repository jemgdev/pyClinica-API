const Patient = require('../models/Patient')

const patientController = {}

const handleErrors = (error) => {

    console.log(error.message, error.code)

    let errors = { email: '' }

    if (error.code === 11000) {
        errors.email = 'Email already exists'
    }

    if (error._message === 'patient validation failed') {
        errors.email = 'Wrong email'
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

module.exports = patientController