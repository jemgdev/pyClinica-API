const { Router } = require('express')
const {  listTurn,insertTurn,deleteTurn,updateTurn,ListOnlySchedules} = require('../controllers/TurnController')
const verifyTokenAdministrator = require('../middlewares/TokenVerifyAdministrator')
const verifyToken = require('../middlewares/TokenVerify')
const router = Router()

router.get('/turn/list-turn',verifyTokenAdministrator ,listTurn)
router.post('/turn/insert-turn/:doctor-id',verifyTokenAdministrator ,insertTurn)
router.delete('/turn/delete-turn/:turn-id',verifyTokenAdministrator ,deleteTurn)
router.put('/turn/update-turn/:turn-id',verifyTokenAdministrator ,updateTurn)
router.get('/turn/listonlyschedules/:turn-id',verifyToken ,ListOnlySchedules)
module.exports = router