const Campus = require("../models/Campus");

const CampusController = {};

// listar campus
CampusController.listCampus = async (req, res) => {
  const campusFound = await Campus.find();
  res.json(campusFound);
};

// insertar campus
CampusController.insertCampus = async (req, res) => {
  const { department, province, district, direction,specialty } = req.body;
  const campusSchema = new Campus({
    department,
    province,
    district,
    direction,
    specialty
  });
  try {
    const campusCreate = await campusSchema.save();
    res.json(campusCreate);
  } catch (error) {
    console.log(error);
  }
};


//eliminar campus por id por parametro
CampusController.deleteCampus = async (req, res) => {
  const idCampus = req.params.campusId;

  try {
    const deleteFound = await Campus.remove({ _id: idCampus });
    res.json(deleteFound);
  } catch (error) {
    console.log(error);
  }
};

//actualizar campus por id por parametro y cambios enviado en json
CampusController.updateCampus = async (req, res) => {
  const idCampus = req.params.idCampus;
  const campusSchema = new Campus({
    department: req.body.department,
    province: req.body.province,
    district: req.body.district,
    direction: req.body.direction,
    specialty:req.body.specialty
  });

  try {
    const updateFound = await Campus.findOneAndUpdate(idCampus, {$set: req.body},{ new: true });
    res.json(updateFound);
  } catch (error) {
    console.log(error);
  }
};

// Listar especialidades de un campus
CampusController.ListOnlySpecialties = async (req, res) => {

  const idCampus = req.params.campusId;
  console.log(idCampus)
  const listSpecialty = await Campus.findById(idCampus).populate('specialty')

  res.json(listSpecialty)
}

module.exports = CampusController;