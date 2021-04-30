const { Router } = require('express')
const { administratorList, insertAdministrator,insertCampus,insertSpecialty,insertDoctor,updateSpecialty } = require('../controllers/AdministratorController')

const router = Router()

router.get('/administrator', administratorList)
router.post('/administrator/:name/:surname_p/:surname_m/:mail/:password/:phone/:dni/:gender/:age', insertAdministrator)
router.post('/administrator/especialty/:name/:availableHours/:campus', insertSpecialty)
router.post('/administrator/campus/:department/:province/:district/:direction', insertCampus)
router.post('/administrator/doctor/:name/:surname_p/:surname_m/:mail/:password/:phone/:dni/:age/:gender/:specialty', insertDoctor)
router.put('/administrator/upspecialty/:idspecialty/:iddoctor', updateSpecialty)
module.exports = router