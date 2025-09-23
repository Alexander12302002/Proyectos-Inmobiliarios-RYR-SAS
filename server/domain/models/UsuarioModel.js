const user = require("../../adapters/usuarioSchema");
const mongoose = require('mongoose');

class User {
    /**
     * Busca un usuario por su ID.
     * @param {string} id - El ID del usuario a buscar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el usuario encontrado.
     */
    async findById(id) {
        return await user.findById(id).exec(); // 🟡 Busca el usuario por ID y lo devuelve.
    }


    /**
     * Inserta un nuevo usuario en la base de datos.
     * @param {Object} productData - Los datos del usuario a insertar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el usuario guardado.
     */
    async insert(productData) {
        const usercreate = new user(productData); // 🟡 Crea una nueva instancia del modelo User con los datos proporcionados.
        return await usercreate.save(); // 🟡 Guarda el usuario en la base de datos y lo devuelve.
    }

    /**
     * Actualiza un usuario específico por su ID.
     * @param {string} id - El ID del usuario a actualizar.
     * @param {Object} updateData - Los datos a actualizar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el usuario actualizado.
     */
    async findByIdAndUpdate(id, updateData) {
        return await user.findByIdAndUpdate(id, updateData, { new: true, upsert: true }).exec(); // 🟡 Busca el usuario por ID y lo actualiza, devolviendo el nuevo documento.
    }


    /**
     * Elimina un usuario específico por su ID.
     * @param {string} id - El ID del usuario a eliminar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el resultado de la eliminación.
     */
    async findByIdAndDelete(id) {
        return await user.findByIdAndDelete(id).exec(); // 🟡 Busca y elimina el usuario por ID, devolviendo el resultado.
    }

    /**
     * Realiza una agregación en los usuarios de la base de datos.
     * @param {Array} query - La consulta de agregación a aplicar.
     * @returns {Promise} - Devuelve una promesa que se resuelve con el resultado de la agregación.
     */
    async aggregate(query) {
        return await user.aggregate(query).exec(); // 🟡 Realiza una agregación sobre los usuarios y devuelve el resultado.
    }

}

module.exports = User; 