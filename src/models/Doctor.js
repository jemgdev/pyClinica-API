const { Schema, model } = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const doctorSchema = new Schema({
    name: { type: String, require: true },
    surname_p: { type: String, require: true},
    surname_m: { type: String, require: true},
    email: {
        type: String,
        require: true,
        unique: true,
        validate: [isEmail, 'invalid email']
    },
    avatar: {
        type: String,
        default: 'https://www.jeas.ruet.ac.bd/images/avatar.png'
    },
    password: {
        type: String,
        require: true
    },
    phone: { type: String },
    dni: {
        type: String,
        unique: true
    },
    gender: { type: String },
    age: { type: Number },
    specialty: {
        type: Schema.Types.ObjectId,
        ref: 'specialty'
    },
    turn:
    {
        type: Schema.Types.ObjectId,
        ref: 'turn'
    },
    medicalAppointment: [
        {
            type: Schema.Types.ObjectId,
            ref: 'medicalAppointment'
        }
    ],
    medicalHistories: [
        {
           type: Schema.Types.ObjectId,
           ref: 'medicalhistory'
        }
    ]
}
    , {
        versionKey: false,
        timestamps: true
    })

doctorSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

doctorSchema.statics.login = async (password, encryptedPassword) => {

    const boolean = await bcrypt.compare(password, encryptedPassword)

    if (boolean) {
        return true
    }
    throw Error('Password is wrong')
}

module.exports = model('doctor', doctorSchema)