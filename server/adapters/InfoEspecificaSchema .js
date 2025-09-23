const mongoose = require("mongoose");

const InfoEspecificaSchema = mongoose.Schema({
  propiedad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'propiedad', // Referencia al modelo de propiedad
    required: true
  },

  sala_comedor: {
    type: Boolean,
    default: false,
  },

  estudio: {
    type: Boolean,
    default: false,
  },

  cocina: {
    type: String,
    enum: ['integral', 'sencilla', 'americana', 'abierta', 'otra'],
    default: 'integral'
  },

  gabinetes_cocina: {
    type: Boolean,
    default: false,
  },

  zona_ropas: {
    type: Boolean,
    default: false,
  },

  pisos: {
    type: String,
    enum: ['ceramica', 'madera', 'porcelanato', 'otro'],
    default: 'ceramica'
  },

  balcon: {
    type: Boolean,
    default: false,
  },

  ascensor: {
    type: Boolean,
    default: false,
  },

  parqueadero: {
    type: String,
    enum: ['privado', 'comunal', 'ninguno'],
    default: 'ninguno'
  }

}, { timestamps: true });

module.exports = mongoose.model('infoEspecifica', InfoEspecificaSchema, 'infoEspecifica');
