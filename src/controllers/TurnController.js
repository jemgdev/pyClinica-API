const Turn = require('../models/Turn')

const TurnController = {}

// listar turnos
TurnController.listTurn = async (req, res) => {
    const turnFound = await Turn.find()
    res.json(turnFound)
}

//insertar turno
TurnController.insertTurn = async (req,res)=>{
    const {type,start_time,end_time,schedules} = req.body   
    
    const turnSchema = new Turn({
        type,
        start_time,
        end_time,
        schedules
    })
    try {
    const turnCreate= await turnSchema.save();
    res.json(turnCreate)
    } catch (error) {
        console.log(error)
    }
}

//eliminar turno
TurnController.deleteTurn = async (req, res) => {
    const idTurn = req.params.turnId;
    try {
      const deleteFound = await Turn.remove({ _id: idTurn });
      res.json(deleteFound);
    } catch (error) {
      console.log(error);
    }
  };

// actualizar turno
TurnController.updateTurn = async (req, res) => {
    const idTurn = req.params.turnId;
    const turnSchema = new Turn({
        type: req.body.type,
        start_time: req.body.start_time,
        end_time:req.body.end_time,
        schedules:req.body.schedules
    });
  
    try {
      const updateFound = await Turn.findOneAndUpdate(idTurn, {$set: req.body},{ new: true });
      res.json(updateFound);
    } catch (error) {
      console.log(error);
    }
  };


// Listar horarios de un turno
TurnController.ListOnlySchedules = async (req, res) => {

  const idTurn = req.params.turnId;
  const listSchedule = await Turn.findById(idTurn).populate('schedules')

  res.json(listSchedule)
}

module.exports = TurnController