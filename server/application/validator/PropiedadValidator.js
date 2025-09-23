const { body, param, query } = require("express-validator");
const { ObjectId } = require("mongodb");

/**
 * Clase que contiene validaciones para las propiedades.
 */
class PropiedadValidator {
  /**
   * Valida que no se envíen datos en el cuerpo ni en la query.
   */
  validateEmptyRequest = () => {
    return [
      body().custom((value, { req }) => {
        if (Object.keys(req.body).length > 0) {
          throw new Error("No envíes datos en el cuerpo");
        }
        return true;
      }),
      query().custom((value, { req }) => {
        if (Object.keys(req.query).length > 0) {
          throw new Error("No envíes parámetros en la URL");
        }
        return true;
      }),
    ];
  };

  /**
   * Validación para crear una propiedad.
   */
  validateCreatePropiedad = () => {
    return [
      body("nombre")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isString().withMessage("El nombre debe ser una cadena de texto"),

      body("direccion")
        .notEmpty().withMessage("La dirección es obligatoria")
        .isString().withMessage("La dirección debe ser una cadena de texto"),

      body("precio")
        .notEmpty().withMessage("El precio es obligatorio")
        .isNumeric().withMessage("El precio debe ser un número"),

      body("imagenes")
        .optional()
        .isArray().withMessage("Las imágenes deben enviarse como un arreglo")
        .custom((imagenes) => {
          imagenes.forEach((img) => {
            if (typeof img !== "string") {
              throw new Error("Cada imagen debe ser una cadena (URL)");
            }
          });
          return true;
        }),

      body("habitaciones")
        .notEmpty().withMessage("El número de habitaciones es obligatorio")
        .isInt({ min: 0 }).withMessage("Las habitaciones deben ser un número entero no negativo"),

      body("banos")
        .notEmpty().withMessage("El número de baños es obligatorio")
        .isInt({ min: 0 }).withMessage("Los baños deben ser un número entero no negativo"),

      body("metros")
        .isInt({ min: 0 }).withMessage("Los metros deben ser un número entero no negativo"),

      body("tipoOperacion")
        .notEmpty().withMessage("El tipo de operación es obligatorio")
        .isIn(["venta", "alquiler"]).withMessage("El tipo de operación debe ser 'venta' o 'alquiler'"),

      body("activo")
        .optional()
        .isBoolean().withMessage("El estado activo debe ser un valor booleano"),
    ];
  };

  /**
   * Validación para actualizar una propiedad.
   */
  validateUpdatePropiedad = () => {
    return [
      param("id")
        .notEmpty().withMessage("El ID es obligatorio")
        .custom((value) => {
          if (!ObjectId.isValid(value)) {
            throw new Error("El ID proporcionado no es válido");
          }
          return true;
        }),
      ...this.validateCreatePropiedad(),
    ];
  };

  /**
   * Validación para eliminar una propiedad.
   */
  validateDeletePropiedad = () => {
    return [
      param("id")
        .notEmpty().withMessage("El ID es obligatorio")
        .custom((value) => {
          if (!ObjectId.isValid(value)) {
            throw new Error("El ID proporcionado no es válido");
          }
          return true;
        }),
      ...this.validateEmptyRequest(),
    ];
  };

  /**
   * Validación para obtener todas las propiedades (sin filtros).
   */
  validateGetAll = () => {
    return [
      query().custom((value, { req }) => {
        if (Object.keys(req.query).length > 0) {
          throw new Error("No se permiten filtros en esta consulta");
        }
        return true;
      })
    ];
  };
}

module.exports = PropiedadValidator;
