const { Schema, model } = require('mongoose')

const prescriptionSchema = new Schema({
    doctor:{
        type: Schema.Types.ObjectId,
        ref: 'doctor'
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'patient'
    },
    detalle: {type: String}
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('prescription', prescriptionSchema)