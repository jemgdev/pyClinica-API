const { Router } = require('express')
const {verifyTokenAdministrator} = require('../middlewares/TokenVerifyAdministrator')
const {listAdministrator,insertAdministrator,loginAdministrator,changePassword,changePersonalInformation } = require('../controllers/AdministratorController')

const router = Router()

router.get('/administrator/listAdministrator', listAdministrator)
router.post('/administrator/insertAdministrator', insertAdministrator)
router.post('/administrator/loginAdministrator', loginAdministrator)
router.put('/administrator/change-password', changePassword)
router.put('/administrator/change-information',changePersonalInformation)

module.exports = router