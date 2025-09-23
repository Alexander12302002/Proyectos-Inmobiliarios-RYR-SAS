const http = require('http');
const path = require('path');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const PropiedadRoutes = require('../../application/routes/PropiedadRouter');
const InfoEspecifica = require('../../application/routes/InfoEspecificaRouter');
const UsuarioRouter = require('../../application/routes/usuarioRouter');

const createServer = () => {
    const app = express();

    const server = http.createServer(app);

    const allowedOrigins = [
        "http://localhost:5173",
        process.env.FRONTEND_URL  // esta la defines en tu .env para producción
    ];

    app.use(cors({
        origin: allowedOrigins,
        credentials: true
    }));

    app.use(express.json());
    app.use(cookieParser());

    // Rutas API
    app.use('/propiedades', PropiedadRoutes);
    app.use('/InfoEspecifica', InfoEspecifica);
    app.use('/usuario', UsuarioRouter);

    app.use(session({
        secret: process.env.KEY_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            httpOnly: true,
        }
    }));

    // Servir archivos estáticos del frontend React build
    app.use(express.static(path.join(__dirname, '../../client/dist')));

    // Para cualquier ruta no manejada por la API, enviar index.html para que React maneje el routing
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });

    return server;
};

module.exports = createServer;
