const { Schema, model } = require("mongoose");

const specialtySchema = new Schema(
  {
    name: { type: String },
    price: { type: Number },
    avatar: {
      type: String,
      default: "https://www.jeas.ruet.ac.bd/images/avatar.png",
    },
    doctors: [
      {
        type: Schema.Types.ObjectId,
        ref: "doctor",
      },
    ],
    campus: { type: Schema.Types.ObjectId, ref: "campus" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("specialty", specialtySchema);
