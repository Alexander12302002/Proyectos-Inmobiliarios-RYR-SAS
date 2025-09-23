const Property = require('../models/propiedadesModel'); // 🟡 Importa el modelo de Property.
const { ObjectId } = require('mongodb'); // 🟡 Importa ObjectId de mongodb para trabajar con IDs.

class PropertyRepository {
    /**
     * Obtiene una propiedad específica por su ID.
     * @param {string} id - El ID de la propiedad que se desea recuperar.
     * @returns {Promise<Object|null>} - Propiedad encontrada o null.
     */
    async getPropertyById(id) {
        try {
            const property = new Property();
            return await property.findPropertyById(id);
        } catch (error) {
            throw new Error(JSON.stringify({ status: 400, message: 'Error retrieving property' }));
        }
    }

    /**
     * Guarda una nueva propiedad en la base de datos.
     * @param {Object} propertyData - Los datos de la propiedad que se desea guardar.
     * @returns {Promise<Object>} - Propiedad guardada.
     */
    async saveAProperty(propertyData) {
        try {
            const property = new Property();
            return await property.createNewProperty(propertyData);
        } catch (error) {
            console.error('Error details:', error);
            throw new Error(JSON.stringify({
                status: 500,
                message: 'Error saving property',
                originalError: error.message
            }));
        }
    }

    /**
     * Elimina una propiedad por su ID.
     * @param {string} id - El ID de la propiedad que se desea eliminar.
     * @returns {Promise<Object|null>} - Propiedad eliminada o null.
     */
    async deleteProperty(id) {
        try {
            const property = new Property();
            return await property.deletePropertyById(id);
        } catch (error) {
            throw new Error(JSON.stringify({ status: 404, message: 'Error deleting property' }));
        }
    }

    /**
     * Actualiza una propiedad por su ID.
     * @param {string} id - El ID de la propiedad.
     * @param {Object} updateData - Los datos a actualizar.
     * @returns {Promise<Object|null>} - Propiedad actualizada o null.
     */
    async updateProperty(id, updateData) {
        try {
            const property = new Property();
            return await property.updatePropertyById(id, updateData);
        } catch (error) {
            throw new Error(JSON.stringify({ status: 500, message: 'Error updating property' }));
        }
    }

    /**
     * Obtiene todas las propiedades.
     * @returns {Promise<Array>} - Lista de propiedades.
     */
    async getAllProperties() {
        try {
            const property = new Property();
            return await property.getAllProperties();
        } catch (error) {
            throw new Error(JSON.stringify({ status: 500, message: 'Error retrieving properties' }));
        }
    }

    /**
     * Obtiene propiedades por estado activo/inactivo.
     * @param {boolean} isActive - true para activas, false para inactivas.
     * @returns {Promise<Array>} - Lista de propiedades.
     */
    async getPropertiesByStatus(isActive) {
        try {
            const property = new Property();
            return await property.getPropertiesByStatus(isActive);
        } catch (error) {
            throw new Error(JSON.stringify({ status: 400, message: 'Error filtering properties by status' }));
        }
    }

    /**
     * Realiza una agregación personalizada sobre las propiedades.
     * @param {Array} pipeline - Pipeline de agregación.
     * @returns {Promise<Array>} - Resultado de la agregación.
     */
    async aggregateProperties(pipeline) {
        try {
            const property = new Property();
            return await property.aggregate(pipeline);
        } catch (error) {
            throw new Error(JSON.stringify({ status: 400, message: 'Error in aggregation query' }));
        }
    }
}

module.exports = PropertyRepository; 
