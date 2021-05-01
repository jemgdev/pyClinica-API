const { Schema, model } = require('mongoose')

const specialtySchema = new Schema({
    name: { type: String},
    availableHours: { type: String },
    price:{type: Number},
    campus:{type:Schema.Types.ObjectId, ref: 'campus'},
    doctors: [{ 
        type:Schema.Types.ObjectId,
        ref: 'doctor'
    }]
}, {
    versionKey: false,
    timestamps: true
})

module.exports = model('specialty', specialtySchema)