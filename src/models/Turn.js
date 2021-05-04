const { Schema, model } = require('mongoose')

const turnSchema = new Schema({
    type: { type: String}, // turno mañana o tarde
    start_time: { type: String},
    end_time: { type: String},
    schedules: [{ 
        type:Schema.Types.ObjectId,
        ref: 'schedule'
    }]
}, {
    versionKey: false,
    timestamps: true
})

module.exports = model('turn', turnSchema)