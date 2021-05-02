const { Router } = require('express')
const { listSchedule,insertSchedule } = require('../controllers/ScheduleController')
const router = Router()

router.get('/schedule/listSchedule', listSchedule)
router.post('/schedule/insertSchedule', insertSchedule)
module.exports = router