const { Router } = require('express')
const {listAdministrator,insertAdministrator,loginAdministrator } = require('../controllers/AdministratorController')

const router = Router()

router.get('/administrator/listAdministrator', listAdministrator)
router.post('/administrator/insertAdministrator', insertAdministrator)
router.post('/administrator/loginAdministrator', loginAdministrator)
module.exports = router