const Specialty = require("../models/Specialty");
const Campus = require("../models/Campus");
const { Mongoose } = require('mongoose')
const mongoose = require('mongoose')

const SpecialtyController = {};

// listar especialidad
SpecialtyController.listSpecialty = async (req, res) => {
  const specialtyFound = await Specialty.find();
  res.json(specialtyFound);
};

// Listado de especialidades por campus
SpecialtyController.listSpecialtyByCampus = async (req, res) => {

  const { campusid } = req.params

  const campusFound = await Campus.aggregate(
      [
          {
              $match: {
                  _id: mongoose.Types.ObjectId(campusid)
              }
          },
          {
              $lookup: {
                  from: 'specialties',  //Collections con la que se unira
                  localField: 'specialty', //Atributo de la collecion Specialty que hara el match
                  foreignField: '_id', //Id de la collections doctors que hara match
                  as: 'specialty' //nombre del nuevo atributo(arreglo)
              }
          },
          {
              $unwind: '$specialty'  //separar los doctores en diferentes objetos segun la cantidad de matches
          },
          {
              //Elegir que atributos mostrar
              $project: {
                  name: '$specialty.name',
                  price: '$specialty.price',
                  district: '$district'
              }
          }
      ]
  )
 
  if(campusFound.length==0){
    res.status(201).json({
      message: "The campus does not exist or doesn't have specialties",
    });
  }else{
    res.status(201).json({
      campusFound,
    });
  }

}

//insertar especialidad
SpecialtyController.insertSpecialty = async (req, res) => {
  const { name, price, doctors, campus } = req.body;

  const especialitySchema = new Specialty({
    name,
    price,
    doctors,
    campus,
  });
  try {
    const especialityCreate = await especialitySchema.save();

    const campusUpdated = await Campus.findByIdAndUpdate(campus,
      {
        $addToSet: {
          specialty: especialityCreate._id,
        },
      },
      {
        new: true,
      }
    );

    //res.json(especialityCreate);
    res.status(201).json({
      message: "La especialidad fue registrada exitosamente",
    });
  } catch (error) {
    res.status(404).json({
      message: `Ocurrió un error al registrar la especialidad: ${error.message}`,
    });
  }
};

//eliminar especialidad
SpecialtyController.deleteSpecialty = async (req, res) => {
  const idSpecialty = req.params.specialtyid;
  try {
    const deleteFound = await Specialty.findByIdAndDelete({ _id: idSpecialty });
    const campusUpdated = await Campus.findByIdAndUpdate(deleteFound.campus, {
      $pull: {
          specialty: deleteFound._id
      }
  }, {
      new: true
  })
    //res.json(deleteFound);
    if(deleteFound==null){
      res.status(201).json({
        message: "La especialidad no existe",
      });
    }else{
      res.status(201).json({
        message: "La especialidad fue eliminada exitosamente",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: `Ocurrió un error al eliminar la especialidad`,
    });
  }
};

// actualizar especialidad
SpecialtyController.updateSpecialty = async (req, res) => {
  const idSpecialty = req.params.specialtyid;
  const specialtySchema = new Specialty({
    name: req.body.name,
    price: req.body.price,
    doctors: req.body.doctors,
  });

  try {
    const updateFound = await Specialty.findOneAndUpdate(
      { _id: idSpecialty },
      { $set: req.body },
      { new: true }
    );
    //res.json(updateFound);
    if(updateFound==null){
      res.status(201).json({
        message: "La especialidad no existe",
      });
    }else{
      res.status(201).json({
        message: "La especialidad fue actualizada exitosamente",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: `Ocurrió un error al actualizar la especialidad: ${error.message}`,
    });
  }
};

module.exports = SpecialtyController;
