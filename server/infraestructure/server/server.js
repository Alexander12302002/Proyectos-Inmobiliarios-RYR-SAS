const http = require('http');
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

    app.use(cors({
        origin: ["http://localhost:5173"],
        credentials: true
    }));

    app.use(express.json());
    app.use(cookieParser());

    app.use('/propiedades', PropiedadRoutes);
    app.use('/InfoEspecifica', InfoEspecifica)
    app.use('/usuario', UsuarioRouter)

    app.use(session({
        secret: process.env.KEY_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            httpOnly: true,
        }
    }));

    return server;
};

module.exports = createServer;