const { Schema, model } = require('mongoose')

const scheduleSchema = new Schema({
    scheduletime: { type: String},
    availability: { type: Boolean,},
    turn:{
        type: Schema.Types.ObjectId, 
        ref: 'turn'
    },
}, {
    versionKey: false,
    timestamps: true
})

module.exports = model('schedule', scheduleSchema)