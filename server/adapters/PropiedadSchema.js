const mongoose = require("mongoose");

// * Esquema de Propiedad
// ? Este esquema define la estructura de una propiedad en la base de datos

const PropiedadSchema = mongoose.Schema({

  // * Nombre de la propiedad
  nombre: {
    type: String,
    required: true,
  },

  // * Dirección de la propiedad
  direccion: {
    type: String,
    required: true,
  },

  // * Precio de la propiedad
  precio: {
    type: Number,
    required: true,
  },

  // * Imágenes de la propiedad
  imagenes: [{
    type: String,
  }],

  // * Número de habitaciones
  habitaciones: {
    type: Number,
    required: true,
  },

  // * Número de baños
  banos: {
    type: Number,
    required: true,
  },

  metros: {
    type: Number,
    required: false,
  },

  // * Tipo de operación
  tipoOperacion: {
    type: String,
    enum: ['venta', 'alquiler'],
    required: true,
  },

  // * Estado de la propiedad (activa o inactiva)
  // ? Define si la propiedad está visible y disponible en el sistema
  activo: {
    type: Boolean,
    default: true,  // ? Por defecto, una propiedad nueva está activa
  },

  descripcion: {
    type: String,
    required: true,
  },

  mapsUrl: {
    type: String,
    required: true
  }

}, { timestamps: true });

// * Exportamos el modelo
module.exports = mongoose.model('propiedad', PropiedadSchema, 'propiedad');
