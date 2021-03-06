const { Router } = require('express')
const verifyTokenAdministrator = require('../middlewares/TokenVerifyAdministrator')
const verifyToken = require('../middlewares/TokenVerify')
const { listCampus, insertCampus,deleteCampus,updateCampus,ListOnlySpecialties,changeAvatar} = require('../controllers/CampusController.js')

const router = Router()
router.get('/campus/listcampus/patient',verifyToken, listCampus)
router.get('/campus/listcampus/admin',verifyTokenAdministrator, listCampus)
router.post('/campus/insertcampus',verifyTokenAdministrator, insertCampus)
router.delete('/campus/deletecampus/:campusid',verifyTokenAdministrator, deleteCampus)
router.put('/campus/updatecampus/:campusid',verifyTokenAdministrator, updateCampus)
router.get('/campus/listonlyspecialties/admin/:campusid',verifyTokenAdministrator, ListOnlySpecialties)
router.put('/campus/change-avatar/:campusid', verifyTokenAdministrator, changeAvatar)
//router.get('/campus/listonlyspecialties/patient/:campus-id',verifyToken, ListOnlySpecialties)
module.exports = router