const { Schema, model } = require('mongoose')

const administrator = new Schema({
    name: { type: String},
    surname_p: { type: String},
    surname_m: { type: String},
    mail: { type: String},
    password: { type: String},
    phone: { type: String},
    dni: { type: String},
    gender: { type: String},
    age: { type: Number}
}, {
    versionKey: false,
    timestamps: true
})

module.exports = model('administrator', administrator)