const { Schema, model } = require('mongoose')

const campusSchema = new Schema({
    department: { type: String},
    province: { type: String},
    district: { type: String},
    direction: { type: String },
    specialty: [{
           type: Schema.Types.String,
           ref: 'specialty'}]
}, {
    versionKey: false,
    timestamps: true
})

module.exports = model('campus', campusSchema)