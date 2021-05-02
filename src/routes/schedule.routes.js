const { Router } = require('express')
const { listSchedule,insertSchedule,deleteSchedule,updateSchedule } = require('../controllers/ScheduleController')
const router = Router()

router.get('/schedule/listSchedule', listSchedule)
router.post('/schedule/insertSchedule', insertSchedule)
router.delete('/schedule/deleteSchedule/:scheduleId', deleteSchedule)
router.put('/schedule/updateSchedule/:scheduleId', updateSchedule)
module.exports = router