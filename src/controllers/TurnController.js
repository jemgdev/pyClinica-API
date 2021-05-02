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
        name: req.body.name,
        price: req.body.price,
        doctors:req.body.doctors
    });
  
    try {
      const updateFound = await Turn.findOneAndUpdate(idTurn, {$set: req.body},{ new: true });
      res.json(updateFound);
    } catch (error) {
      console.log(error);
    }
  };

module.exports = TurnController