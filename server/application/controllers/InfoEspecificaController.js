const { validationResult } = require("express-validator");
const InfoEspecificaService = require("../services/InfoEspecificaService");

class InfoEspecificaController {
    constructor() {
        this.infoService = new InfoEspecificaService();
    }

    /**
     * Obtiene la información específica de una propiedad.
     */
    async getInfoByPropiedadId(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({ errors: errors.array() });

            const info = await this.infoService.getInfoByPropiedadId(req.params.propiedadId);
            if (!info) {
                return res.status(404).json({ message: "Información no encontrada" });
            }
            res.status(200).json(info);
        } catch (error) {
            const errorObj = JSON.parse(error.message || '{}');
            res.status(errorObj.status || 500).json({ message: errorObj.message || 'Error al obtener la información' });
        }
    }

    /**
     * Crea una nueva información específica para una propiedad.
     */
    async createInfo(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({ errors: errors.array() });

            const info = await this.infoService.createInfo(req.body);
            res.status(201).json(info);
        } catch (error) {
            const errorObj = JSON.parse(error.message || '{}');
            res.status(errorObj.status || 500).json({ message: errorObj.message || 'Error al crear la información' });
        }
    }

    /**
     * Actualiza la información específica de una propiedad.
     */
    async updateInfoByPropiedadId(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({ errors: errors.array() });

            const updated = await this.infoService.updateInfoByPropiedadId(
                req.params.propiedadId,
                req.body
            );

            if (!updated) {
                return res.status(404).json({ message: 'Información no encontrada' });
            }

            res.status(200).json(updated);
        } catch (error) {
            const errorObj = JSON.parse(error.message || '{}');
            res.status(errorObj.status || 500).json({ message: errorObj.message || 'Error al actualizar la información' });
        }
    }

    /**
     * Elimina la información específica de una propiedad.
     */
    async deleteInfoByPropiedadId(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({ errors: errors.array() });

            const deleted = await this.infoService.deleteInfoByPropiedadId(req.params.propiedadId);

            if (!deleted) {
                return res.status(404).json({ message: 'Información no encontrada' });
            }

            res.status(204).send(); // No content
        } catch (error) {
            const errorObj = JSON.parse(error.message || '{}');
            res.status(errorObj.status || 500).json({ message: errorObj.message || 'Error al eliminar la información' });
        }
    }
}

module.exports = InfoEspecificaController;
