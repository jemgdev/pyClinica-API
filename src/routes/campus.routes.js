const { Router } = require('express')
const { listCampus, insertCampus,deleteCampus,updateCampus} = require('../controllers/CampusController.js')

const router = Router()
router.get('/campus/listCampus', listCampus)
router.post('/campus/insertCampus', insertCampus)
router.delete('/campus/deleteCampus/:campusId', deleteCampus)
router.put('/campus/updateCampus/:campusId', updateCampus)
module.exports = router