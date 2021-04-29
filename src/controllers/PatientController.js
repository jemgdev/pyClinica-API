const Patient = require('../models/Patient')

const PatientController = {}

const handleErrors = (error) => {

    console.log(error.message, error.code)
}

PatientController.register = async (req, res) => {

    const { email, password, confirmPassword } = req.body

    if (password === confirmPassword) {

        const newPatient = new Patient({

            email,
            password
        })

        try {

            const patientSaved = await newPatient.save()

            res.json(patientSaved)            
        } catch (error) {
            
            handleErrors(error)
        }

    } 
    else {

        res.json({
            error: 'Passwords are differents'
        })
    }


}