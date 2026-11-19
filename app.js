const express = require('express');
const cors = require('cors');
const boxRoutes = require('./src/routes/boxRoutes');

const app = express();

// Middleware para parsing de requisições JSON
app.use(cors());
app.use(express.json());

// Rotas da aplicação sob o prefixo /api
app.use('/api', boxRoutes);

module.exports = app;
