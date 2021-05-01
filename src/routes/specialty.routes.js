const { Router } = require('express')
const { specialtyList } = require('../controllers/SpecialtyController')
const router = Router()

router.get('/specialtylist', specialtyList)

module.exports = router