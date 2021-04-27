const { Schema, model } = require('mongoose')

const specialtySchema = new Schema({
    name: { type: String, unique: true },
    availableHours: { type: Date },
    campus: {
        type: Schema.Types.ObjectId,
        ref: 'campus'
    }
}, {
    versionKey: false,
    timestamps: true
})

module.exports = model('specialty', specialtySchema)