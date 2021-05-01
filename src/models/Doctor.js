const { Schema, model } = require('mongoose')

const doctor = new Schema({
    name: { type: String},
    surname_p: { type: String},
    surname_m: { type: String},
    mail: { type: String},
    password: { type: String},
    phone: { type: String},
    dni: { type: String},
    gender: { type: String},
    age: { type: Number},
    specialty:{type:Schema.Types.ObjectId, ref: 'specialty'},
    }
, {
    versionKey: false,
    timestamps: true
})

module.exports = model('doctor', doctor)