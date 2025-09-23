const { validationResult } = require("express-validator");
const PropertyService = require("../services/PropiedadaService");

class PropertyController {
    constructor() {
        this.propertyService = new PropertyService();
    }

    /**
     * Obtiene una propiedad específica por ID.
     */
    async getPropertyById(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const property = await this.propertyService.getPropertyById(req.params.id);
            res.status(200).json(property);
        } catch (error) {
            try {
                const errorObj = JSON.parse(error.message);
                res.status(errorObj.status).json({ message: errorObj.message });
            } catch {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    /**
     * Obtiene todas las propiedades.
     */
    async getAllProperties(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const properties = await this.propertyService.getAllProperties();
            res.status(200).json(properties);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    /**
     * Obtiene propiedades filtradas por estado (activo/inactivo).
     */
    async getPropertiesByStatus(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const status = req.query.active === 'true';
            const properties = await this.propertyService.getPropertiesByStatus(status);
            res.status(200).json(properties);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    /**
     * Crea una nueva propiedad.
     */
    async createProperty(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const newProperty = await this.propertyService.createProperty(req.body);
            res.status(201).json(newProperty);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    /**
     * Actualiza una propiedad por ID.
     */
    async updateProperty(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const updated = await this.propertyService.updateProperty(req.params.id, req.body);
            res.status(200).json(updated);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    /**
     * Elimina una propiedad por ID.
     */
    async deleteProperty(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const deleted = await this.propertyService.deleteProperty(req.params.id);
            if (!deleted) {
                return res.status(404).json({ message: 'Property not found or could not be deleted' });
            }

            res.status(204).send(); // No content
        } catch (error) {
            try {
                const errorObj = JSON.parse(error.message);
                res.status(errorObj.status).json({ message: errorObj.message });
            } catch (jsonError) {
                res.status(500).json({ message: 'An internal server error occurred' });
            }
        }
    }
}

module.exports = PropertyController;
