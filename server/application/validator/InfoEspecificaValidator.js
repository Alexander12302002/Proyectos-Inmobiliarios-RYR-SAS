const { body, param } = require("express-validator");
const { ObjectId } = require("mongodb");

class InfoEspecificaValidator {
  
  /**
   * Valida los campos al crear información específica.
   */
  validateCreateInfo = () => {
    return [
      body("propiedad")
        .notEmpty().withMessage("El ID de la propiedad es obligatorio")
        .custom(value => {
          if (!ObjectId.isValid(value)) {
            throw new Error("El ID de propiedad no es válido");
          }
          return true;
        }),

      body("salaComedor")
        .isBoolean().withMessage("El campo salaComedor debe ser booleano"),

      body("estudio")
        .isBoolean().withMessage("El campo estudio debe ser booleano"),

      body("gabinetesCocina")
        .isBoolean().withMessage("El campo gabinetesCocina debe ser booleano"),

      body("zonaRopas")
        .isBoolean().withMessage("El campo zonaRopas debe ser booleano"),

      body("balcon")
        .isBoolean().withMessage("El campo balcon debe ser booleano"),

      body("ascensor")
        .isBoolean().withMessage("El campo ascensor debe ser booleano"),

      body("cocina")
        .notEmpty().withMessage("El campo cocina es obligatorio")
        .isString().withMessage("El campo cocina debe ser texto"),

      body("pisos")
        .notEmpty().withMessage("El campo pisos es obligatorio")
        .isString().withMessage("El campo pisos debe ser texto"),

      body("parqueadero")
        .notEmpty().withMessage("El campo parqueadero es obligatorio")
        .isString().withMessage("El campo parqueadero debe ser texto"),
    ];
  };

  /**
   * Valida el ID de propiedad para update.
   */
  validateUpdateInfo = () => {
    return [
      param("propiedadId")
        .notEmpty().withMessage("El ID de la propiedad es obligatorio")
        .custom(value => {
          if (!ObjectId.isValid(value)) {
            throw new Error("El ID no es válido");
          }
          return true;
        }),
      ...this.validateCreateInfo()
    ];
  };

  /**
   * Valida el ID de propiedad en consultas y eliminación.
   */
  validatePropiedadIdParam = () => {
    return [
      param("propiedadId")
        .notEmpty().withMessage("El ID de la propiedad es obligatorio")
        .custom(value => {
          if (!ObjectId.isValid(value)) {
            throw new Error("El ID no es válido");
          }
          return true;
        })
    ];
  };
}

module.exports = InfoEspecificaValidator;
