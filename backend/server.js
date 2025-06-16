import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const FRONTEND_URL = process.env.FRONTEND_URL || '*'; // Permite todos se não definido

// Configura CORS para aceitar apenas o frontend
app.use(cors({
  origin: FRONTEND_URL,
}));
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes); // Cadastro, login, reset, etc.
app.use('/api/tasks', taskRoutes); // CRUD de tarefas

// Rota raiz
app.get('/', (req, res) => res.send('API Online'));

// Conexão com o MongoDB e inicialização do servidor
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB conectado!');
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch(err => {
    console.error('Erro ao conectar no MongoDB:', err);
    process.exit(1);
  });
