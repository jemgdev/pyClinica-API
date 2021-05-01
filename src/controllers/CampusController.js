const Campus = require('../models/Campus')

const CampusController = {}

CampusController.campusList = async (req, res) => {

    const campusFound = await Campus.find()
    
    res.json(campusFound)
}

module.exports = CampusController