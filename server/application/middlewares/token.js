const jwt = require('jsonwebtoken'); // Importa el módulo jsonwebtoken

/**
 * Genera un token JWT para un usuario.
 * 
 * @param {Object} user - Objeto que representa al usuario. Debe contener la información que se quiere incluir en el token.
 * @returns {string} - El token JWT generado.
 */
const generateToken = (user) => {
    // Genera un token JWT que expira en 30 minutos
    return jwt.sign(user, process.env.KEY_SECRET, { expiresIn: '360m' });
};

module.exports = generateToken;