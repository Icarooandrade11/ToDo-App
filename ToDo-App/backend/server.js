const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes); // ✅ Cadastro e login
app.use('/api/tasks', taskRoutes);      // ✅ Tarefas

// Página inicial da API
app.get('/', (req, res) => {
  res.send('API Online');
});

// Conexão com o banco
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado!');
    app.listen(5000, () => console.log('Servidor rodando na porta 5000'));
  })
  .catch(err => console.error(err));

module.exports = app;