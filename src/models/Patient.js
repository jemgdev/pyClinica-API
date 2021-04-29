const { Schema, model } = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const patientSchema = new Schema({

    name: { type: String },
    fatherLastName: { type: String },
    motherLastName: { type: String },
    email: { 
        type: String, 
        require: true, 
        unique: true, 
        validate: [ isEmail, 'invalid email' ] 
    },
    password: { 
        type: String,
        require: true
    },
    avatar: {
        type: String,
        default: 'https://www.jeas.ruet.ac.bd/images/avatar.png'
    },
    phoneNumber: { type: String },
    dni: { 
        type: String,
        unique: true
    },
    age: { type: Number },
    gender: { type: String },
    civilStatus: { type: String },
    department: { type: String },
    province: { type: String },
    district: { type: String },
    address: { type: String },
    addressReference: { type: String },
    medicalAppointments: [
        {
           type: Schema.Types.ObjectId,
           ref: 'medicalAppointment'
        }
    ]
}, {
    timestamps: true,
    versionKey: false
})

patientSchema.pre('save', async function() {

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

patientSchema.statics.login = async (password, encryptedPassword) => {

    const state = await bcrypt.compare(password, encryptedPassword)

    if (state) {
        return state
    }

    throw Error('Password is wrong')
}

module.exports = model('patient', patientSchema)