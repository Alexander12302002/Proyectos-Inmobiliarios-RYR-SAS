const express = require('express');
const PropertyController = require('../controllers/PropiedadController');
const PropertyValidator = require('../validator/PropiedadValidator');

const router = express.Router();
const propertyController = new PropertyController();
const propertyValidator = new PropertyValidator();

/**
 * @route GET /all
 * @group Properties - Operations about properties
 * @returns {Array} 200 - List of all properties
 * @returns {Error} 500 - Server error
 */
router.get('/all', propertyValidator.validateGetAll(), (req, res) =>
    propertyController.getAllProperties(req, res)
);

/**
 * @route GET /status
 * @group Properties - Filter properties by status
 * @param {boolean} active.query.required - Filter by active/inactive
 * @returns {Array} 200 - List of properties by status
 * @returns {Error} 400 - Invalid query parameter
 */
router.get('/status', (req, res) =>
    propertyController.getPropertiesByStatus(req, res)
);

/**
 * @route GET /:id
 * @group Properties - Get a property by ID
 * @param {string} id.path.required - ID of the property
 * @returns {Object} 200 - Requested property
 * @returns {Error} 404 - Property not found
 */
router.get('/:id',  (req, res) =>
    propertyController.getPropertyById(req, res)
);

/**
 * @route POST /
 * @group Properties - Create new property
 * @param {Property.model} property.body.required - Property data
 * @returns {Object} 201 - Created property
 * @returns {Error} 400 - Invalid property data
 */
router.post('/', propertyValidator.validateCreatePropiedad(), (req, res) =>
    propertyController.createProperty(req, res)
);

/**
 * @route PUT /:id
 * @group Properties - Update a property
 * @param {string} id.path.required - ID of the property
 * @param {Property.model} property.body.required - Updated data
 * @returns {Object} 200 - Updated property
 * @returns {Error} 400 - Validation error
 */
router.put('/:id', propertyValidator.validateUpdatePropiedad(), (req, res) =>
    propertyController.updateProperty(req, res)
);

/**
 * @route DELETE /:id
 * @group Properties - Delete a property
 * @param {string} id.path.required - ID of the property
 * @returns {Object} 204 - Deleted successfully
 * @returns {Error} 404 - Property not found
 */
router.delete('/:id', propertyValidator.validateDeletePropiedad(), (req, res) =>
    propertyController.deleteProperty(req, res)
);

module.exports = router;
