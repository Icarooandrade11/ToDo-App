const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name||!email||!password) return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    if (await User.findOne({ email })) return res.status(400).json({ message: 'E‑mail já cadastrado' });

    const hashed = await bcrypt.hash(password, 8);
    await new User({ name, email, password: hashed }).save();
    res.status(201).json({ message: 'Usuário criado!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro interno no registro' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });

    if (!await bcrypt.compare(password, user.password))
      return res.status(401).json({ message: 'Senha incorreta' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro interno no login' });
  }
});

// Esqueceu a senha (exemplo básico)
router.post('/forgot-password', (req, res) => {
  // aqui você dispara email com link de reset contendo token…
  res.json({ message: 'Se existir esse e‑mail, você receberá instruções.' });
});

module.exports = router;