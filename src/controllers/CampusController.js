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
    //res.json(campusCreate);
    res.status(201).json({
      message: "Campus registrado correctamente",
    });
  } catch (error) {
    console.log(error);
  }
};


//eliminar campus por id por parametro
CampusController.deleteCampus = async (req, res) => {
  const idCampus = req.params.campusid;

  try {
    const deleteFound = await Campus.findByIdAndRemove({ _id: idCampus });
    //res.json(deleteFound);
    res.status(201).json({
      message: "Campus eliminado correctamente",
    });
  } catch (error) {
    console.log(error);
  }
};

//actualizar campus por id por parametro y cambios enviado en json
CampusController.updateCampus = async (req, res) => {
  const idCampus = req.params.campusid;
  const campusSchema = new Campus({
    department: req.body.department,
    province: req.body.province,
    district: req.body.district,
    direction: req.body.direction,
    specialty:req.body.specialty
  });

  try {
    const updateFound = await Campus.findOneAndUpdate({ _id: idCampus }, {$set: req.body},{ 
      new: true 
    });
    //res.json(updateFound);
    res.status(201).json({
      message: "Campus actualizado correctamente",
    });
  } catch (error) {
    console.log(error);
  }
};

// Listar especialidades de un campus
CampusController.ListOnlySpecialties = async (req, res) => {

  const idCampus = req.params.campusid;
  console.log(idCampus)
  const listSpecialty = await Campus.findById(idCampus).populate('specialty')

  //res.json(listSpecialty)
  res.status(201).json({
    message: "Especialidades encontradas correctamente",
    listSpecialty
  });
}

module.exports = CampusController;