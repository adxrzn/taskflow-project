require('dotenv').config();

if (!process.env.PORT) {
    throw new Error('Error crítico de infraestructura: El PORT no está definido en el archivo .env');
}

const env = {
    PORT: process.env.PORT || 3000
};

module.exports = env;