const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const administrator = new Schema(
  {
    name: { type: String },
    surname_p: { type: String },
    surname_m: { type: String },
    email: {
      type: String,
      require: true,
      unique: true,
      validate: [isEmail, "Correo invalido"],
    },
    password: { type: String, require: true },
    avatar: {
      type: String,
      default: "https://www.jeas.ruet.ac.bd/images/avatar.png",
    },
    phone: { type: String },
    dni: { type: String},
    gender: { type: String },
    age: { type: Number },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

administrator.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

administrator.statics.login = async (password, encryptedPassword) => {
  const state = await bcrypt.compare(password, encryptedPassword);

  if (state) {
    return state;
  }

  throw Error("Contraseña incorrecta");
};

administrator.statics.changePassword = async (password) => {

  const salt = await bcrypt.genSalt(10)
  passwordEncrypted = await bcrypt.hash(password, salt)

  return passwordEncrypted
}

module.exports = model("administrator", administrator);
