const { Router } = require('express')
const { listSchedule,insertSchedule,deleteSchedule,updateSchedule } = require('../controllers/ScheduleController')
const verifyTokenAdministrator = require('../middlewares/TokenVerifyAdministrator')
const verifyToken = require('../middlewares/TokenVerify')
const router = Router()

router.get('/schedule/listschedule',verifyToken,listSchedule)
router.get('/schedule/listschedule/admin',verifyTokenAdministrator,listSchedule)
router.post('/schedule/insertschedule',verifyTokenAdministrator ,insertSchedule)
router.delete('/schedule/deleteschedule/:scheduleid', verifyTokenAdministrator,deleteSchedule)
//Comentado porque se actualiza desde cuando uno pide cita médica
//router.put('/schedule/updateschedule/:schedule-id',verifyTokenAdministrator ,updateSchedule)
module.exports = router