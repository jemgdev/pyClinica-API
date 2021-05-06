const { Router } = require('express')
const verifyTokenAdministrator = require('../middlewares/TokenVerifyAdministrator')
const verifyToken = require('../middlewares/TokenVerify')
const { listCampus, insertCampus,deleteCampus,updateCampus,ListOnlySpecialties} = require('../controllers/CampusController.js')

const router = Router()
router.get('/campus/listcampus/patient',verifyToken, listCampus)
router.get('/campus/listcampus/admin',verifyTokenAdministrator, listCampus)
router.post('/campus/insertcampus',verifyTokenAdministrator, insertCampus)
router.delete('/campus/deletecampus/:campus-id',verifyTokenAdministrator, deleteCampus)
router.put('/campus/updatecampus/:campus-id',verifyTokenAdministrator, updateCampus)
router.get('/campus/listonlyspecialties/admin/:campus-id',verifyTokenAdministrator, ListOnlySpecialties)
router.get('/campus/listonlyspecialties/patient/:campus-id',verifyToken, ListOnlySpecialties)
module.exports = router