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



module.exports = CampusController