const Administrator = require('../models/Administrator')
const jwt = require('jsonwebtoken')
const AdministratorController = {}

const handleErrors = (error) => {

    console.log(error.message, error.code)

    let errors = { email: '', password: '' }

    if (error.code === 11000) {
        errors.email = 'Correo ya exite'
    }

    if (error._message === 'Verificación de administrador fallida') {
        errors.email = 'Correo incorrecto'
    }

    if (error.message === 'Contraseña incorrecta') {
        errors.password = 'Contraseña incorrecta'
    }

    return errors

}

AdministratorController.listAdministrator = async (req, res) => {
    const administratorFound = await Administrator.find()
    console.log(administratorFound)
    res.json(administratorFound)
}

AdministratorController.loginAdministrator = async (req, res) => {

    const { email, password } = req.body

    const administratorFound = await Administrator.findOne({ email })

    if (administratorFound) {

        try {

            if (await Administrator.login(password, administratorFound.password)) {

                const token = await jwt.sign({ id: administratorFound._id }, process.env.SECRET_KEY, {

                    expiresIn: 60 * 60 * 24
                })
    
                res.status(200).json({
                    status: true,
                    token
                })
            } 
            else {
    
                res.status(200).json({
                    status: false
                })
            }
            
        } catch (error) {

            console.log(error)
            
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

AdministratorController.insertAdministrator = async (req, res) => {
    const { name,surname_p,surname_m, mail,password,phone,dni,gender, age} = req.body   
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

AdministratorController.changePersonalInformation = async (req, res) => {

    const { name,surname_p,surname_m, mail,password,phone,dni,gender, age} = req.body 

        try {
    
            const administratorUpdated = await Patient.findByIdAndUpdate(req.id, {
            name,
            surname_p,
            surname_m,
            phone,
            dni,
            gender,
            age
            }, {
                new: true
            })
        
            res.status(201).json(administratorUpdated)
            
        } catch (error) {
    
            res.status(500).json({
                error: handleErrors(error)
            })
        }
}

AdministratorController.changePassword = async (req, res) => {
    
    const { password, newPassword } = req.body

    const administratorFound = await Administrator.findById(req.id)

    try {
        
        if (await Administrator.login(password, administratorFound.password)) {

            const administratorUpdated = await Administrator.findByIdAndUpdate(req.id, {
                password: await Administrator.changePassword(newPassword)
            })
    
            res.status(201).json(administratorUpdated)
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
    

module.exports = AdministratorController