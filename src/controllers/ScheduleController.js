const Schedule = require("../models/Schedule");
const Turn = require('../models/Turn')

const ScheduleController = {};

// Listando Horario
ScheduleController.listSchedule = async (req, res) => {
  const ScheduleFound = await Schedule.find();
  res.json(ScheduleFound);
};

// Insertando horario
ScheduleController.insertSchedule = async (req, res) => {
  const { scheduletime, availability, turn } = req.body;
  const ScheduleSchema = new Schedule({
    scheduletime,
    availability,
    turn
  });
  try {
    const ScheduleCreate = await ScheduleSchema.save();
    const turnUpdated = await Turn.findByIdAndUpdate(
      turn,
      {
        $addToSet: {
          schedules: ScheduleCreate._id,
        },
      },
      {
        new: true,
      }
    );
   //res.json(ScheduleCreate);
   res.status(201).json({
    message: "El horario fue registrado exitosamente",
  });
  } catch (error) {
    res.status(200).json({
      message: `Ocurrió un error al registrar el horario: ${error.message}`,
    });
  }
};

//Eliminando horario
ScheduleController.deleteSchedule = async (req, res) => {
  const idSchedule = req.params.scheduleid;
  try {
    const deleteFound = await Schedule.findByIdAndDelete({ _id: idSchedule });
    const turnUpdated = await Turn.findByIdAndUpdate(deleteFound.turn, {
      $pull: {
          schedules: deleteFound._id
      }
  }, {
      new: true
  })
    //res.json(deleteFound);
      res.status(201).json({
        message: "El horario fue eliminado exitosamente",
      });
  } catch (error) {
    res.status(200).json({
      message: `Ocurrió un error al eliminar el horario: ${error.message}`,
    });
  }
};

module.exports = ScheduleController;
