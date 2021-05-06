const { Schema, model } = require('mongoose')

const medicalappointmentSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'patient'
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'doctor'
    },
    date:{type : Date, default: Date.now},
    description:{type: String,},
    price:{type: String,}
}, {
    versionKey: false,
    timestamps: true
})

module.exports = model('medicalappointment', medicalappointmentSchema)