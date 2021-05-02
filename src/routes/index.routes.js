const routers = {
    specialty: require('./specialty.routes'),
    patient: require('./patient.routes'),
    administrator: require('./administrator.routes'),
    medicalappointment: require('./medicalappointment.routes'),
    campus: require('./campus.routes'),
    doctor: require('./doctor.routes'),
    turn: require('./turn.routes'),
    schedule: require('./schedule.routes')
}

module.exports = routers