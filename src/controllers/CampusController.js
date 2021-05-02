const Campus = require("../models/Campus");

const CampusController = {};

CampusController.listCampus = async (req, res) => {
  const campusFound = await Campus.find();
  res.json(campusFound);
};

CampusController.insertCampus = async (req, res) => {
  const { department, province, district, direction } = req.body;
  const campusSchema = new Campus({
    department,
    province,
    district,
    direction,
  });
  try {
    const campusCreate = await campusSchema.save();
    res.json(campusCreate);
  } catch (error) {
    console.log(error);
  }
};

CampusController.linkCampusEsp = async (req, res) => {
  const { idCampus, idEsp } = req.body;

  const newEsp = await Campus.findByIdAndUpdate(
    idCampus,
    {
      $addToSet: {
        specialty: idEsp,
      },
    },
    {
      new: true,
    }
  );
  try {
    res.json(newEsp);
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
module.exports = CampusController;
