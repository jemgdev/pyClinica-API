const { Router } = require('express')
const { listCampus, insertCampus,linkCampusEsp,deleteCampus,updateCampus} = require('../controllers/CampusController.js')

const router = Router()
router.get('/campus/listCampus', listCampus)
router.post('/campus/insertCampus', insertCampus)
router.put('/campus/linkCampusEsp', linkCampusEsp)
router.delete('/campus/deleteCampus/:campusId', deleteCampus)
router.put('/campus/updateCampus/:campusId', updateCampus)
module.exports = router