const Campus = require('../models/Campus')

const CampusController = {}

CampusController.listCampus = async (req, res) => {
    const campusFound = await Campus.find()
    res.json(campusFound)
}

CampusController.insertCampus = async(req,res) =>{
    const {department,province,district,direction} = req.body   
    const campusSchema = new Campus({
        department,
        province,
        district,
        direction
    })
    try {
    const campusCreate= await campusSchema.save();
    res.json(campusCreate)
    } catch (error) {
        console.log(error)
    }
}

CampusController.linkCampusEsp= async (req, res) => {

    const {idCampus, idEsp} = req.body

    const newEsp = await Campus.findByIdAndUpdate(idCampus, {
        $addToSet: {
            specialty: idEsp
        }
    }, {
        new: true
    })
    try {
    res.json(newEsp)
    }catch (error) {
        console.log(error)
    }
}



module.exports = CampusController