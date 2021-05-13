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
    price:{type: String,},
    schedule:{
        type: Schema.Types.ObjectId,
        ref:'schedule'
    }

}, {
    versionKey: false,
    timestamps: true
})

module.exports = model('medicalappointment', medicalappointmentSchema)