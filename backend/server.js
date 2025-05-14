const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const taskRoutes = require('./routes/taskRoutes');
app.use(cors());
app.use(express.json());

app.use('/api', taskRoutes);

module.exports = app;

app.get('/', (req, res) => {
  res.send('API Online');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado!');
    app.listen(5000, () => console.log('Servidor rodando na porta 5000'));
  })
  .catch(err => console.error(err));
