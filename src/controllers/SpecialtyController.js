const Specialty = require('../models/Specialty')

const SpecialtyController = {}

SpecialtyController.specialtyList = async (req, res) => {

    const specialtyFound = await Specialty.find()

    res.json(specialtyFound)
}

SpecialtyController.insertSpecialty = async (req, res) => {

    const specialtyFound = await Specialty.find()

    res.json(specialtyFound)
}

module.exports = SpecialtyController