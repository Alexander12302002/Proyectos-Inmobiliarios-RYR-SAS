const PropertyRepository = require('../../domain/repositories/propiedadesRepositories');
const { ObjectId } = require('mongodb');

/**
 * PropertyService - clase para manejar la lógica de negocio de propiedades.
 */
class PropertyService {
    constructor() {
        this.propertyRepo = new PropertyRepository();
    }

    /**
     * Obtiene una propiedad por su ID.
     * @param {string} id - El ID de la propiedad.
     * @returns {Promise<Object>} - La propiedad encontrada.
     * @throws {Error} - Si no se encuentra la propiedad o ID inválido.
     */
    async getPropertyById(id) {
        if (!ObjectId.isValid(id)) {
            throw new Error(JSON.stringify({ status: 400, message: 'Invalid property ID' }));
        }

        const propiedad = await this.propertyRepo.getPropertyById(id);
        if (!propiedad) {
            throw new Error(JSON.stringify({ status: 404, message: 'Property not found' }));
        }
        return propiedad;
    }

    /**
     * Obtiene todas las propiedades.
     * @returns {Promise<Array>} - Array de propiedades.
     * @throws {Error} - Si ocurre un error en obtención.
     */
    async getAllProperties() {
        const props = await this.propertyRepo.getAllProperties();
        if (!props || !Array.isArray(props)) {
            throw new Error(JSON.stringify({ status: 404, message: 'No properties found' }));
        }
        return props;
    }

    /**
     * Obtiene propiedades por su estado activo/inactivo.
     * @param {boolean} isActive - true para activas, false para inactivas.
     * @returns {Promise<Array>} - Lista de propiedades filtradas.
     * @throws {Error} - Si hay error en la consulta.
     */
    async getPropertiesByStatus(isActive) {
        // asegurar que isActive es boolean
        if (typeof isActive !== 'boolean') {
            throw new Error(JSON.stringify({ status: 400, message: 'Status must be a boolean' }));
        }

        const props = await this.propertyRepo.getPropertiesByStatus(isActive);
        if (!props || !Array.isArray(props)) {
            throw new Error(JSON.stringify({ status: 404, message: 'No properties with that status found' }));
        }
        return props;
    }

    /**
     * Crea una nueva propiedad.
     * @param {Object} data - Datos de la propiedad a crear.
     * @returns {Promise<Object>} - Propiedad creada.
     * @throws {Error} - Si falla la creación.
     */
    async createProperty(data) {
        // podrías validar aquí que los campos obligatorios existan (o confiar en el validator antes de llamar)
        const newProp = await this.propertyRepo.saveAProperty(data);
        if (!newProp) {
            throw new Error(JSON.stringify({ status: 500, message: 'Error creating property' }));
        }
        return newProp;
    }

    /**
     * Actualiza una propiedad por su ID.
     * @param {string} id - ID de la propiedad a actualizar.
     * @param {Object} updateData - Datos para actualizar.
     * @returns {Promise<Object>} - Objeto con mensaje y la propiedad actualizada.
     * @throws {Error} - Si la propiedad no existe o falla la actualización.
     */
    async updateProperty(id, updateData) {
        if (!ObjectId.isValid(id)) {
            throw new Error(JSON.stringify({ status: 400, message: 'Invalid property ID' }));
        }

        const updated = await this.propertyRepo.updateProperty(id, updateData);
        if (!updated) {
            throw new Error(JSON.stringify({ status: 404, message: 'Property not found or could not be updated' }));
        }
        return { message: 'Property updated successfully', updatedProperty: updated };
    }

    /**
     * Elimina (borrado lógico o físico según repo) una propiedad por su ID.
     * @param {string} id - ID de la propiedad.
     * @returns {Promise<Object>} - La propiedad eliminada.
     * @throws {Error} - Si propiedad no existe o falla la eliminación.
     */
    async deleteProperty(id) {
        if (!ObjectId.isValid(id)) {
            throw new Error(JSON.stringify({ status: 400, message: 'Invalid property ID' }));
        }

        const deleted = await this.propertyRepo.deleteProperty(id);
        if (!deleted) {
            throw new Error(JSON.stringify({ status: 404, message: 'Property not found or could not be deleted' }));
        }

        return deleted;
    }
}

module.exports = PropertyService;
