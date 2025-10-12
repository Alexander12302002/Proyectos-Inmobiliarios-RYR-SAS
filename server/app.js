const ConnectToDatabase = require('./infraestructure/database/mongodb');
const createServer = require('./infraestructure/server/server');

require('dotenv').config({ path: '../.env' });

const startApp = async () => {
    let connectToDatabase = new ConnectToDatabase();
    await connectToDatabase.open();

    const server = createServer();

    const PORT = process.env.PORT || 3000; // Usar el puerto de Render o 3000 por defecto

    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startApp();
