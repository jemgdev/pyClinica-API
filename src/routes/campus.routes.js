const { Router } = require('express')
const { campusList } = require('../controllers/CampusController.js')

const router = Router()
router.get('/campuslist', campusList)

module.exports = router