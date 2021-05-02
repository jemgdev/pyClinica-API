const { Router } = require('express')
const {  listTurn,insertTurn,deleteTurn,updateTurn} = require('../controllers/TurnController')
const router = Router()

router.get('/turn/listTurn', listTurn)
router.post('/turn/insertTurn', insertTurn)
router.delete('/turn/deleteTurn/:turnId', deleteTurn)
router.put('/turn/updateTurn/:turnId', updateTurn)
module.exports = router