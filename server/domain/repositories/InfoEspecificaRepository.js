const InfoEspecificaModel = require('../models/InfoEspecificaModel');

class InfoEspecificaRepository {
    constructor() {
        this.model = new InfoEspecificaModel();
    }

    /**
     * Crea una nueva información específica para una propiedad.
     * @param {Object} data - Datos de la información específica.
     * @returns {Promise<Object>} - Documento creado.
     */
    async saveInfo(data) {
        try {
            return await this.model.create(data);
        } catch (error) {
            throw new Error(JSON.stringify({
                status: 500,
                message: 'Error saving specific info' + error,
                originalError: error.message
            }));
        }
    }

    /**
     * Obtiene la información específica de una propiedad.
     * @param {string} propiedadId - ID de la propiedad.
     * @returns {Promise<Object|null>} - Información encontrada o null.
     */
    async getInfoByPropiedadId(propiedadId) {
        try {
            return await this.model.getByPropiedadId(propiedadId);
        } catch (error) {
            throw new Error(JSON.stringify({
                status: 404,
                message: 'Error retrieving specific info'
            }));
        }
    }

    /**
     * Actualiza la información específica de una propiedad.
     * @param {string} propiedadId - ID de la propiedad.
     * @param {Object} updateData - Datos a actualizar.
     * @returns {Promise<Object|null>} - Información actualizada o null.
     */
    async updateInfoByPropiedadId(propiedadId, updateData) {
        try {
            return await this.model.updateByPropiedadId(propiedadId, updateData);
        } catch (error) {
            throw new Error(JSON.stringify({
                status: 500,
                message: 'Error updating specific info'
            }));
        }
    }

    /**
     * Elimina la información específica de una propiedad.
     * @param {string} propiedadId - ID de la propiedad.
     * @returns {Promise<Object|null>} - Documento eliminado o null.
     */
    async deleteInfoByPropiedadId(propiedadId) {
        try {
            return await this.model.deleteByPropiedadId(propiedadId);
        } catch (error) {
            throw new Error(JSON.stringify({
                status: 500,
                message: 'Error deleting specific info'
            }));
        }
    }

    /**
     * Obtiene todas las informaciones específicas.
     * @returns {Promise<Array>} - Lista de documentos.
     */
    async getAllInfo() {
        try {
            return await this.model.getAll();
        } catch (error) {
            throw new Error(JSON.stringify({
                status: 500,
                message: 'Error retrieving all specific info'
            }));
        }
    }
}

module.exports = InfoEspecificaRepository;
