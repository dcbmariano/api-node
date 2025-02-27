const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Produtos',
            version: '1.0.0',
            description: 'API para gerenciamento de produtos',
        },
        servers: [
            {
                url: 'http://localhost:8001',
                description: 'Servidor local'
            }
        ]
    },
    apis: ['./routes/produtos.js'], // Caminho para as rotas
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
