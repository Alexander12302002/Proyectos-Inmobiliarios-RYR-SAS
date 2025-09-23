const express = require('express');
const InfoEspecificaController = require('../controllers/InfoEspecificaController');
const InfoEspecificaValidator = require('../validator/InfoEspecificaValidator');

const router = express.Router();
const controller = new InfoEspecificaController();
const validator = new InfoEspecificaValidator();

/**
 * @route GET /:propiedadId
 * @group InfoEspecifica - Obtener info específica de una propiedad
 * @param {string} propiedadId.path.required - ID de la propiedad
 * @returns {Object} 200 - Información específica
 */
router.get('/:propiedadId', validator.validatePropiedadIdParam(), (req, res) =>
    controller.getInfoByPropiedadId(req, res)
);

/**
 * @route POST /
 * @group InfoEspecifica - Crear información específica
 * @param {object} info.body.required - Datos de información específica
 * @returns {Object} 201 - Información creada
 */
router.post('/', validator.validateCreateInfo(), (req, res) =>
    controller.createInfo(req, res)
);

/**
 * @route PUT /:propiedadId
 * @group InfoEspecifica - Actualizar info específica por ID de propiedad
 * @param {string} propiedadId.path.required - ID de la propiedad
 * @returns {Object} 200 - Información actualizada
 */
router.put('/:propiedadId', validator.validateUpdateInfo(), (req, res) =>
    controller.updateInfo(req, res)
);

/**
 * @route DELETE /:propiedadId
 * @group InfoEspecifica - Eliminar info específica por ID de propiedad
 * @param {string} propiedadId.path.required - ID de la propiedad
 * @returns {Object} 204 - Eliminado correctamente
 */
router.delete('/:propiedadId', validator.validatePropiedadIdParam(), (req, res) =>
    controller.deleteInfo(req, res)
);

module.exports = router;
