const express = require('express');
const path = require('path');
const produtosRoutes = require('./routes/produtos');
const { swaggerUi, swaggerDocs } = require('./config/swagger');

const app = express();
const porta = 8001;

app.use(express.json());
app.use('/produtos', produtosRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Servir a página HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'app.html'));
});

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
    console.log(`Documentação disponível em http://localhost:${porta}/docs`);
});
