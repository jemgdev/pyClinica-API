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
    res.json(ScheduleCreate);
    console.log(turn);
  } catch (error) {
    console.log(error);
  }
};

//Eliminando horario
ScheduleController.deleteSchedule = async (req, res) => {
  const idSchedule = req.params.schedule-id;
  try {
    const deleteFound = await Schedule.findByIdAndDelete({ _id: idSchedule });
    const turnUpdated = await Turn.findByIdAndUpdate(deleteFound.turn, {
      $pull: {
          schedules: deleteFound._id
      }
  }, {
      new: true
  })
    res.json(deleteFound);
  } catch (error) {
    console.log(error);
  }
};

/*Actualizando Horario
ScheduleController.updateSchedule = async (req, res) => {
  const idSchedule = req.params.schedule-id;
  const scheduleSchema = new Schedule({
    scheduletime: req.body.scheduletime,
    availability: req.body.availability,
  });
  try {
    const updateFound = await Schedule.findByIdAndUpdate(
       idSchedule,
      { $set: req.body },
      { new: true }
    );
    res.json(updateFound);
  } catch (error) {
    console.log(error);
  }
};*/

module.exports = ScheduleController;
