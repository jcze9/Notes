//al agregar unique es para que el dato sera unico y no se repita (ose no se registre el mismo correo)
const { Schema, model } = require("mongoose");
const bcryptjs = require("bcryptjs");
const UserSchema = new Schema(
  {
    user: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);
//cifra la clave
UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};
//compara la clave ingresada por el user (encriptando la clave)
UserSchema.methods.matchPassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};
module.exports = model("User", UserSchema);
