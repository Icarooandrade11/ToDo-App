const express = require("express");
const router  = express.Router();
const jwt     = require("jsonwebtoken");
const User    = require("../models/User");        // seu model de usuário
const bcrypt  = require("bcryptjs");
const authenticateJWT = require("../middleware/authenticateJWT");

// — POST /api/auth/register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, user });
});

// — POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Usuário não encontrado" });
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ message: "Senha incorreta" });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, user });
});

// — GET /api/auth/me  ← central para seu 404
//    Retorna os dados do usuário logado, usando o middleware de JWT
router.get("/me", authenticateJWT, async (req, res) => {
  // authenticateJWT já colocou `req.userId`
  const user = await User.findById(req.userId).select("-password");
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
  res.json(user);
});

module.exports = router;