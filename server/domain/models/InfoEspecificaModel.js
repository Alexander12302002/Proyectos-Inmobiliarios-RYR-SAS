const InfoEspecifica = require('../../adapters/InfoEspecificaSchema ');

class InfoEspecificaModel {
    /**
     * Crea una nueva información específica para una propiedad.
     * @param {Object} data - Datos a guardar.
     * @returns {Promise<Object>} - Documento creado.
     */
    async create(data) {
        const nuevaInfo = new InfoEspecifica(data);
        return await nuevaInfo.save();
    }

    /**
     * Obtiene la información específica de una propiedad por su ID de propiedad.
     * @param {string} propiedadId - ID de la propiedad.
     * @returns {Promise<Object|null>} - Documento encontrado o null.
     */
    async getByPropiedadId(propiedadId) {
        return await InfoEspecifica.findOne({ propiedad: propiedadId }).exec();
    }

    /**
     * Actualiza la información específica por el ID de la propiedad.
     * @param {string} propiedadId - ID de la propiedad.
     * @param {Object} updateData - Datos a actualizar.
     * @returns {Promise<Object|null>} - Documento actualizado o null.
     */
    async updateByPropiedadId(propiedadId, updateData) {
        return await InfoEspecifica.findOneAndUpdate(
            { propiedad: propiedadId },
            updateData,
            { new: true }
        ).exec();
    }

    /**
     * Elimina la información específica de una propiedad.
     * @param {string} propiedadId - ID de la propiedad.
     * @returns {Promise<Object|null>} - Documento eliminado o null.
     */
    async deleteByPropiedadId(propiedadId) {
        return await InfoEspecifica.findOneAndDelete({ propiedad: propiedadId }).exec();
    }

    /**
     * Trae todos los documentos de info específica.
     * @returns {Promise<Array>} - Lista de documentos.
     */
    async getAll() {
        return await InfoEspecifica.find({}).exec();
    }
}

module.exports = InfoEspecificaModel;
