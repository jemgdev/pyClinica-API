const { Schema, model } = require('mongoose')

const medicalHistorySchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'patient'
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'doctor'
    },
    date: { 
        type : Date, 
        default: Date.now 
    },
    description: { type: String },
    price: { type: String },
    prescription: {
        type: Schema.Types.ObjectId,
        ref: 'prescription'
    }
}, {
    versionKey: false,
    timestamps: true
})

module.exports = model('medicalhistory', medicalHistorySchema)