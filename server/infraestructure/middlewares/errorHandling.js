exports.jsonParseErrorHandler = (err, req, res, next) => {
    // 🟡 Verifica si el error es una instancia de SyntaxError, el estado es 400 y el error tiene un cuerpo.
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Error de sintaxis JSON:', err.message); // 🟡 Registra el mensaje de error en la consola.
        return res.status(400).json({
            message: 'Invalid JSON format. Please check the data and try again.' // 🟡 Mensaje de error para el cliente.
        });
    }
    next();
}