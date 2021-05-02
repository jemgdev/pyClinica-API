const Schedule = require('../models/Schedule')

const ScheduleController = {}

// Listando Horario
ScheduleController.listSchedule = async (req, res) => {
    const ScheduleFound = await Schedule.find()
    res.json(ScheduleFound)
}

// Insertando horario
ScheduleController.insertSchedule = async (req,res)=>{
    const { scheduletime,availability,turn} = req.body   
    
    const ScheduleSchema = new Schedule({
        scheduletime,
        availability
    })
    try {
    const ScheduleCreate= await ScheduleSchema.save();
    res.json(ScheduleCreate)
    } catch (error) {
        console.log(error)
    }
}

//Eliminando horario
ScheduleController.deleteSchedule = async (req, res) => {
    const idSchedule = req.params.scheduleId;
    try {
      const deleteFound = await Schedule.remove({ _id: idSchedule });
      res.json(deleteFound);
    } catch (error) {
      console.log(error);
    }
  };

//Actualizando Horario
ScheduleController.updateSchedule = async (req, res) => {
    const idSchedule = req.params.scheduleId;
    const scheduleSchema = new Schedule({
        scheduletime: req.body.scheduletime,
        availability: req.body.availability
    });
    try {
      const updateFound = await Schedule.findOneAndUpdate(idSchedule, {$set: req.body},{ new: true });
      res.json(updateFound);
    } catch (error) {
      console.log(error);
    }
  };

module.exports = ScheduleController