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


/*router.put('/update-nota/:id/:idUser', async (req, res) => {

    const {id, idUser} = req.params

    const newNota = await notas.findByIdAndUpdate(id, {
        $addToSet: {
            user: idUser
        }
    }, {
        new: true
    })

    res.json(newNota)
})
/*
AdministratorController.updateEspecialidad = async(req,res) =>{

}

router.put('/update-nota/:id/:idUser', async (req, res) => {

    const {id, idUser} = req.params

    const newNota = await notas.findByIdAndUpdate(id, {
        $addToSet: {
            user: idUser
        }
    }, {
        new: true
    })

    res.json(newNota)
})

router.put('/delete-one-user-nota/:id/:idUser', async (req, res) => {

    const {id, idUser} = req.params

    const newNota = await notas.findByIdAndUpdate(id, {
        $pull: {
            user: idUser
        }
    }, {
        new: true
    })

    res.json(newNota)
})

*/






module.exports = AdministratorController