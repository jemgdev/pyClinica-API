const { Router } = require('express')
const verifyTokenAdministrator = require('../middlewares/TokenVerifyAdministrator')

const {listAdministrator,insertAdministrator,loginAdministrator,changePassword,changePersonalInformation,InfoAdministratorById } = require('../controllers/AdministratorController')

const router = Router()

router.get('/administrator/listAdministrator', verifyTokenAdministrator, listAdministrator)
router.post('/administrator/insertAdministrator', verifyTokenAdministrator, insertAdministrator)
router.post('/administrator/loginAdministrator', loginAdministrator)
router.put('/administrator/change-password',verifyTokenAdministrator, changePassword)
router.put('/administrator/change-information',verifyTokenAdministrator,changePersonalInformation)
router.get('/administrator/info-administrator',verifyTokenAdministrator, InfoAdministratorById)

module.exports = router