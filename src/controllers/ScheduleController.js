const Schedule = require('../models/Schedule')

const ScheduleController = {}

ScheduleController.listSchedule = async (req, res) => {
    const ScheduleFound = await Schedule.find()
    res.json(ScheduleFound)
}
ScheduleController.insertSchedule = async (req,res)=>{
    const { scheduletime,availability,turn} = req.body   
    
    const ScheduleSchema = new Schedule({
        scheduletime,
        availability,
        turn
    })
    try {
    const ScheduleCreate= await ScheduleSchema.save();
    res.json(ScheduleCreate)
    } catch (error) {
        console.log(error)
    }
}
module.exports = ScheduleController