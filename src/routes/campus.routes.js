const { Router } = require('express')
const { listCampus, insertCampus} = require('../controllers/CampusController.js')

const router = Router()
router.get('/campus/listCampus', listCampus)
router.post('/campus/insertCampus', insertCampus)
module.exports = router