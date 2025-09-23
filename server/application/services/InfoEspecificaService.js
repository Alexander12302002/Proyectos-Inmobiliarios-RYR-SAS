const InfoEspecificaRepository = require('../../domain/repositories/InfoEspecificaRepository');
const { ObjectId } = require('mongodb');

/**
 * InfoEspecificaService - Lógica de negocio para info específica de una propiedad
 */
class InfoEspecificaService {
    constructor() {
        this.repo = new InfoEspecificaRepository();
    }

    /**
     * Obtiene la info específica de una propiedad por su ID.
     * @param {string} propiedadId
     * @returns {Promise<Object>}
     */
    async getInfoByPropiedadId(propiedadId) {
        if (!ObjectId.isValid(propiedadId)) {
            throw new Error(JSON.stringify({ status: 400, message: 'Invalid propiedad ID' }));
        }

        const info = await this.repo.getInfoByPropiedadId(propiedadId);
        if (!info) {
            throw new Error(JSON.stringify({ status: 404, message: 'Información específica no encontrada' }));
        }

        return info;
    }

    /**
     * Crea una nueva info específica.
     * @param {Object} data - Datos de la info específica
     * @returns {Promise<Object>}
     */
    async createInfo(data) {
        // Aquí podrías validar si la propiedad ya tiene info y lanzar error si es duplicada
        const created = await this.repo.saveInfo(data);
        if (!created) {
            throw new Error(JSON.stringify({ status: 500, message: 'Error al crear la información' }));
        }

        return created;
    }

    /**
     * Actualiza info específica por propiedad ID.
     * @param {string} propiedadId
     * @param {Object} updateData
     * @returns {Promise<Object>}
     */
    async updateInfoByPropiedadId(propiedadId, updateData) {
        if (!ObjectId.isValid(propiedadId)) {
            throw new Error(JSON.stringify({ status: 400, message: 'Invalid propiedad ID' }));
        }

        const updated = await this.repo.updateInfoByPropiedadId(propiedadId, updateData);
        if (!updated) {
            throw new Error(JSON.stringify({ status: 404, message: 'Información no encontrada o no se pudo actualizar' }));
        }

        return updated;
    }

    /**
     * Elimina la info específica de una propiedad.
     * @param {string} propiedadId
     * @returns {Promise<Object>}
     */
    async deleteInfoByPropiedadId(propiedadId) {
        if (!ObjectId.isValid(propiedadId)) {
            throw new Error(JSON.stringify({ status: 400, message: 'Invalid propiedad ID' }));
        }

        const deleted = await this.repo.deleteInfoByPropiedadId(propiedadId);
        if (!deleted) {
            throw new Error(JSON.stringify({ status: 404, message: 'Información no encontrada o no se pudo eliminar' }));
        }

        return deleted;
    }
}

module.exports = InfoEspecificaService;
