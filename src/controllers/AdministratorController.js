const Administrator = require('../models/Administrator')

const AdministratorController = {}

AdministratorController.listAdministrator = async (req, res) => {
    const administratorFound = await Administrator.find()
    console.log(administratorFound)
    res.json(administratorFound)
}

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

AdministratorController.loginAdministrator = async (req, res) => {

    const { email, password } = req.body

    const administratorFound = await Administrator.findOne({ email })

    if (administratorFound) {

        try {
        
            if (administratorFound) {
    
                if (await Administrator.login(password, administratorFound.password)) {
        
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
            error: 'Correo no registrado' 
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

module.exports = AdministratorController