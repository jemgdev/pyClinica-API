const { Schema, model } = require('mongoose')

const campusSchema = new Schema({
    department: { type: String},
    province: { type: String},
    district: { type: String},
    avatar: {
        type: String,
        default: "https://www.jeas.ruet.ac.bd/images/avatar.png",
      },
    direction: { type: String },
    specialty: [{
           type: Schema.Types.ObjectId,
           ref: 'specialty'}]
}, {
    versionKey: false,
    timestamps: true
})

module.exports = model('campus', campusSchema)