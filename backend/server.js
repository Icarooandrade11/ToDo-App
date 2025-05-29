require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const privateTaskRoutes = require("./routes/privateTaskRoutes");
const publicTaskRoutes = require("./routes/publicTaskRoutes");

const app = express();

// === Configuração de CORS ===
// Origem permitida (no .env coloque CLIENT_URL=http://localhost:3000 ou sua URL de front)
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true, // permite envio de cookies ou auth headers
};
app.use(cors(corsOptions));

// === Middlewares ===
app.use(express.json()); // já faz o body parser

// === Rotas públicas ===
app.get("/", (req, res) => {
  res.send("API Online 🚀");
});
app.use("/api/auth", authRoutes);
app.use("/api/public-tasks", publicTaskRoutes);

// === Rotas protegidas (private) ===
// Idealmente, aqui você usaria um middleware de autenticação JWT antes de 'privateTaskRoutes'
// ex: app.use("/api/tasks", authenticateJWT, privateTaskRoutes);
app.use("/api/tasks", privateTaskRoutes);

// === Conexão com MongoDB e start do servidor ===
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));