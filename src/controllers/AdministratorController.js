const Administrator = require('../models/Administrator')

const AdministratorController = {}

AdministratorController.listAdministrator = async (req, res) => {
    const administratorFound = await Administrator.find()
    console.log(administratorFound)
    res.json(administratorFound)
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