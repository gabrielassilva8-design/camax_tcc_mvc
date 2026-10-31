const express = require('express');
const boxRoutes = require('./routes/boxRoutes');

const app = express();

// Middleware para parsing de requisições JSON
app.use(express.json());

// Rotas da aplicação sob o prefixo /api
app.use('/api', boxRoutes);

module.exports = app;