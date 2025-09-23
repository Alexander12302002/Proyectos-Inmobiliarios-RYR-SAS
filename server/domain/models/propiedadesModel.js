const Propiedad = require("../../adapters/PropiedadSchema");

class Property {

    /**
     * Busca una propiedad por su ID.
     * @param {string} id - El ID de la propiedad a buscar.
     * @returns {Promise<Object|null>} - Propiedad encontrada o null.
     */
    async findPropertyById(id) {
        return await Propiedad.findById(id).exec();
    }

    /**
     * Obtiene todas las propiedades.
     * @returns {Promise<Array>} - Lista de propiedades.
     */
    async getAllProperties() {
        return await Propiedad.find({}).exec();
    }

    /**
     * Crea una nueva propiedad.
     * @param {Object} propertyData - Datos de la nueva propiedad.
     * @returns {Promise<Object>} - Propiedad creada.
     */
    async createNewProperty(propertyData) {
        const propiedad = new Propiedad(propertyData);
        return await propiedad.save();
    }

    /**
     * Elimina una propiedad por su ID.
     * @param {string} id - ID de la propiedad a eliminar.
     * @returns {Promise<Object|null>} - Propiedad eliminada o null.
     */
    async deletePropertyById(id) {
        return await Propiedad.findByIdAndDelete(id).exec();
    }

    /**
     * Actualiza los datos de una propiedad.
     * @param {string} id - ID de la propiedad.
     * @param {Object} updateData - Datos a actualizar.
     * @returns {Promise<Object|null>} - Propiedad actualizada o null.
     */
    async updatePropertyById(id, updateData) {
        return await Propiedad.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }

    /**
     * Realiza una agregación personalizada en propiedades.
     * @param {Array} query - Consulta de agregación (pipeline).
     * @returns {Promise<Array>} - Resultado de la agregación.
     */
    async aggregate(query) {
        return await Propiedad.aggregate(query).exec();
    }

    /**
     * Filtra propiedades por estado activo/inactivo.
     * @param {boolean} isActive - true para activas, false para inactivas.
     * @returns {Promise<Array>} - Lista de propiedades filtradas.
     */
    async getPropertiesByStatus(isActive) {
        return await Propiedad.find({ activo: isActive }).exec();
    }
}

module.exports = Property;
