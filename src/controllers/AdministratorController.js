const Administrator = require('../models/Administrator')
const jwt = require('jsonwebtoken')
const AdministratorController = {}

const handleErrors = (error) => {

    console.log(error.message, error.code)

    let errors = {email: '', password: '' }

    if (error.code === 11000) {
        errors.email = 'Correo ya exite'
    }

    if (error.errors.email) {
        errors.email = 'Correo incorrecto'
    }

    if (error.message === 'Contraseña incorrecta') {
        errors.password = 'Contraseñaa incorrecta'
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
    console.log("correo: "+administratorFound);
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

            res.status(404).json({
                error: 'Constraseña incorrecta' 
            })
        }
    }else {

        res.status(404).json({
            error: 'El correo no esta registrado' 
        })
    }
}

AdministratorController.insertAdministrator = async (req, res) => {
    const { name,surname_p,surname_m, email,password,phone,dni,gender, age} = req.body   
    console.log(name)
    const administratorSchema = new Administrator({
        name,
        surname_p,
        surname_m,
        email,
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

    const { name,surname_p,surname_m,phone,dni,gender,age} = req.body 

        try {
    
            const administratorUpdated = await Administrator.findByIdAndUpdate(req.id, {
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

            administradorUpdatedInfo={
                "avatar": administratorUpdated.avatar,
                "name": administratorUpdated.name,
                "surname_p": administratorUpdated.surname_p,
                "surname_m": administratorUpdated.surname_m,
                "phone": administratorUpdated.phone,
                "dni": administratorUpdated.dni,
                "gender": administratorUpdated.gender,
                "age": administratorUpdated.age,
            }

            res.status(201).json(administradorUpdatedInfo)
            
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
            },{
                new: true
            })
    
            res.status(201).json({status: true})
        }
        else {
    
            res.status(404).json({
                error: 'Las contraseñas son diferentes'
            })
        }
    } catch (error) {
        
        res.status(404).json({error:'Contraseña incorrecta'})
    }
}

AdministratorController.InfoAdministratorById = async (req, res) => {

    try {
        const administratorGet = await Administrator.findById(req.id)
        const administratorInfo={
            "avatar": administratorGet.avatar,
            "name": administratorGet.name,
            "surname_p": administratorGet.surname_p,
            "surname_m": administratorGet.surname_m,
            "email": administratorGet.email,
            "phone": administratorGet.phone,
            "dni": administratorGet.dni,
            "gender": administratorGet.gender,
            "age": administratorGet.age,
        }
        res.status(201).json(administratorInfo)
    } catch (error) {
        res.error.json(administratorGet)
    }
}


module.exports = AdministratorController