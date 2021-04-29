const routers = {
    specialty: require('./specialty.routes'),
    patient: require('./patient.routes'),
    administrator: require('./administrator.routes'),
    medicalappointment: require('./medicalappointment.routes')
}

module.exports = routers