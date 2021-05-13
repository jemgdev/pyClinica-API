const { Router } = require('express')
const {  listTurn,insertTurn,deleteTurn,updateTurn,ListOnlySchedules, listSchedulesIdDoctor} = require('../controllers/TurnController')
const verifyTokenAdministrator = require('../middlewares/TokenVerifyAdministrator')
const verifyToken = require('../middlewares/TokenVerify')
const router = Router()

router.get('/turn/list-turn',verifyTokenAdministrator ,listTurn)
router.post('/turn/insert-turn/:doctorid',verifyTokenAdministrator ,insertTurn)
router.delete('/turn/delete-turn/:turnid',verifyTokenAdministrator ,deleteTurn)
router.put('/turn/update-turn/:turnid',verifyTokenAdministrator ,updateTurn)
router.get('/turn/listonlyschedules/:turnid',verifyToken ,ListOnlySchedules)
router.get('/turn/listonlyschedules-admin/:iddoctor',verifyTokenAdministrator ,listSchedulesIdDoctor)
module.exports = router