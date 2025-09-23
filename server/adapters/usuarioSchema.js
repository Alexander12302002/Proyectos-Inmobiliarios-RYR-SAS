const mongoose = require("mongoose");

const UsuarioSchema = mongoose.Schema({

  nombre: {
    type: String,
    required: true, 
  },

  correo: {
    type: String,
    required: true,  
    unique: true,   
    match: [/.+\@.+\..+/, 'Por favor ingresa un correo válido'],  // * Validación de formato de correo
  },

  contraseña: {
    type: String,
    required: true, 
  },

  fotoPerfil: {
    type: String,
    default: '', 
  },

}, { timestamps: true }); 

module.exports = mongoose.model("usuario", UsuarioSchema, 'usuario');