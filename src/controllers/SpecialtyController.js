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

  const { idCampus } = req.params

  const campusFound = await Campus.aggregate(
      [
          {
              $match: {
                  _id: mongoose.Types.ObjectId(idCampus)
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

  res.status(201).json({
      message: "Specialty found",
      campusFound
  })

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

    res.json(especialityCreate);
  } catch (error) {
    console.log(error);
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
    res.json(deleteFound);
  } catch (error) {
    console.log(error);
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
    res.json(updateFound);
  } catch (error) {
    console.log(error);
  }
};

/* Listar doctores de una especialidad
SpecialtyController.ListOnlyDoctors = async (req, res) => {
  const idSpecialty = req.params.specialty-id;
  const listDoctor = await Specialty.findById(idSpecialty).populate("doctors");
  res.json(listDoctor);
};*/

module.exports = SpecialtyController;
