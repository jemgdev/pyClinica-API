const { Router } = require('express')
const verifyTokenAdministrator = require('../middlewares/TokenVerifyAdministrator')

const {listAdministrator,insertAdministrator,loginAdministrator,changePassword,changePersonalInformation,InfoAdministratorById } = require('../controllers/AdministratorController')

const router = Router()

router.get('/administrator/list', verifyTokenAdministrator, listAdministrator)
router.post('/administrator/insert', verifyTokenAdministrator, insertAdministrator)
router.post('/administrator/login', loginAdministrator)
router.put('/administrator/change-password',verifyTokenAdministrator, changePassword)
router.put('/administrator/change-information',verifyTokenAdministrator,changePersonalInformation)
router.get('/administrator/get-information',verifyTokenAdministrator, InfoAdministratorById)

module.exports = router