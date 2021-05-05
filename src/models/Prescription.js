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
    detail: {type: String},
    date : { type : Date, default: Date.now}
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('prescription', prescriptionSchema)