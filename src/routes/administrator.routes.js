const { Router } = require('express')
const {listAdministrator,insertAdministrator } = require('../controllers/AdministratorController')

const router = Router()

router.get('/administrator/listAdministrator', listAdministrator)
router.post('/administrator/insertAdministrator', insertAdministrator)
module.exports = router