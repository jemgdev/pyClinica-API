const { Router } = require('express')
const { listCampus, insertCampus,linkCampusEsp} = require('../controllers/CampusController.js')

const router = Router()
router.get('/campus/listCampus', listCampus)
router.post('/campus/insertCampus', insertCampus)
router.put('/campus/linkCampusEsp', linkCampusEsp)
module.exports = router