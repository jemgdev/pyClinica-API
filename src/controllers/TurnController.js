const Doctor = require("../models/Doctor");
const Turn = require("../models/Turn");
const mongoose = require("mongoose");
const TurnController = {};

// listar turnos
TurnController.listTurn = async (req, res) => {
  const turnFound = await Turn.find().select({"createAt":0 , "updatedAt":0});
  res.json(turnFound);
};

//insertar turno
TurnController.insertTurn = async (req, res) => {
  const idDoctor = req.params.doctorid;
  const { type, start_time, end_time, schedules } = req.body;

  const turnSchema = new Turn({
    type,
    start_time,
    end_time,
    schedules,
  });
  try {
    const turnCreate = await turnSchema.save();
    await Doctor.findByIdAndUpdate(
      idDoctor,
      { turn: turnCreate._id,
      },
      {
        new: true,
      }
    );
    //res.json({ turnCreate, doctorUpdated });
    res.status(201).json({
      message: "El turno fue registrado exitosamente",
    });
  } catch (error) {
    res.status(200).json({
      message: `Ocurrió un error al insertar el turno: ${error.message}`,
    });
  }
};

//eliminar turno
TurnController.deleteTurn = async (req, res) => {
  const idTurn = req.params.turnid;
  try {
    await Doctor.findOneAndUpdate(
      { turn: idTurn },
      {
        $pull: {
          turn: idTurn,
        },
      }
    );
    const deleteFound = await Turn.findByIdAndDelete(idTurn);
    //res.json(deleteFound);
    if(deleteFound==null){
      res.status(201).json({
        message: "El turno no existe",
      });
    }else{
      res.status(201).json({
        message: "El turno fue eliminado exitosamente",
      });
    }
  } catch (error) {
    res.status(200).json({
      message: `Ocurrió un error al eliminar el turno: ${error.message}`,
    });
  }
};

// actualizar turno
TurnController.updateTurn = async (req, res) => {
  const idTurn = req.params.turnid;

  try {
    const updateFound = await Turn.findOneAndUpdate(
      { _id: idTurn },
      { $set: req.body },
      { new: true }
    );
    // res.json();
    if(updateFound==null){
      res.status(201).json({
        message: "El turno no existe",
      });
    }else{
      res.status(201).json({
        message: "El turno fue actualizado exitosamente",
      });
    }
  } catch (error) {
    res.status(200).json({
      message: `Ocurrió un error al actualizar el turno: ${error.message}`,
    });
  }
};

// Listar horarios de un turno
TurnController.ListOnlySchedules = async (req, res) => {
  const idTurn = req.params.turnid;
  const listSchedule = await Turn.findById(idTurn).populate("schedules");
 
  if(listSchedule==null){
    res.status(201).json({
      message: "El turno no existe",
    });
  }else{
    res.json(listSchedule);
  }
};

// Listar horarios por Doctor
TurnController.listSchedulesIdDoctor = async (req, res) => {
  const { iddoctor } = req.params;

  const doctorFound = await Doctor.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(iddoctor),
      },
    },
    {
      $lookup: {
        from: "turns",
        localField: "turn",
        foreignField: "_id",
        as: "turn",
      },
    },
    {
      $unwind: "$turn",
    },
    {
      $lookup: {
        from: "schedules",
        localField: "turn.schedules",
        foreignField: "_id",
        as: "schedules",
      },
    },
    {
      $unwind: "$schedules",
    },
    {
      $project: {
        _id: "$schedules._id",
        doctornames: "$name",
        doctorsurname_p:"$surname_p",
        doctorsurname_m:"$surname_m",
        turn: "$turn.type",
        schedule: "$schedules.scheduletime",
        availability: "schedules.availability",
      },
    },
  ]);


  if(doctorFound.length==0){
    res.status(201).json({
      message: "El doctor no existe o no cuenta con horarios",
    });
  }else{
    res.status(201).json(
      doctorFound,
    );
  }
};

module.exports = TurnController;
