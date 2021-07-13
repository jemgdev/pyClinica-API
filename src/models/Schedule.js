const { Schema, model } = require('mongoose')

const scheduleSchema = new Schema({
    scheduletime: { type: String},
    availability: { type: Boolean, default: true},
    turn:{
        type: Schema.Types.ObjectId, 
        ref: 'turn'
    },
}, {
    versionKey: false,
    timestamps: true
})

module.exports = model('schedule', scheduleSchema)