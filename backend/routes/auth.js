const express   = require('express');
const router    = express.Router();
const User      = require('../models/User');
const bcrypt    = require('bcryptjs');
const jwt       = require('jsonwebtoken');
const authMw    = require('../middleware/auth');
const { sendResetEmail } = require('../services/mails');

// ─── 1) REGISTRO ───────────────────────────────────────────────
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'E‑mail já cadastrado.' });
    }

    const hashed = await bcrypt.hash(password, 8);
    await new User({ name, email, password: hashed }).save();
    return res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (err) {
    console.error('Erro interno no registro:', err);
    return res.status(500).json({ message: 'Erro interno no registro.' });
  }
});

// ─── 2) LOGIN ──────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado.' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error('Erro interno no login:', err);
    return res.status(500).json({ message: 'Erro interno no login.' });
  }
});

// ─── 3) ME (retorna dados do usuário logado) ────────────────────
router.get('/me', authMw, async (req, res) => {
  // o authMw adiciona req.user = payload do JWT
  try {
    const user = await User.findById(req.user.id, 'name email');
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    return res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Erro no /me:', err);
    return res.status(500).json({ message: 'Erro interno.' });
  }
});

// ─── 4) FORGOT PASSWORD (envio de e‑mail) ───────────────────────
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'E‑mail é obrigatório.' });
  }

  // encontra o usuário (mas devolve sempre 200 pra não vazar existência)
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: 'Se esse e‑mail existir, você receberá instruções.' });
  }

  // gera token de reset e salva no usuário
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  user.resetToken   = token;
  user.resetExpires = Date.now() + 3600 * 1000; // 1 hora
  await user.save();

  // dispara o envio de e‑mail
  try {
    await sendResetEmail(user.email, token);
    return res.json({ message: 'Se esse e‑mail existir, você receberá instruções.' });
  } catch (err) {
    console.error('Falha ao enviar e‑mail de reset:', err);
    // retorna 200 mesmo assim para não travar o front
    return res.json({ message: 'Se esse e‑mail existir, você receberá instruções.' });
  }
});

// ─── 5) RESET PASSWORD (atualiza senha) ────────────────────────
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Token e nova senha são obrigatórios.' });
  }

  try {
    // valida e decodifica o JWT
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // encontra o usuário pelo token salvo e ainda válido
    const user = await User.findOne({
      _id: payload.id,
      resetToken: token,
      resetExpires: { $gt: Date.now() }
    });
    if (!user) {
      return res.status(400).json({ message: 'Token inválido ou expirado.' });
    }

    // atualiza a senha e limpa os campos de reset
    user.password     = await bcrypt.hash(newPassword, 8);
    user.resetToken   = undefined;
    user.resetExpires = undefined;
    await user.save();

    return res.json({ message: 'Senha redefinida com sucesso!' });
  } catch (err) {
    console.error('Erro ao resetar senha:', err);
    return res.status(400).json({ message: 'Token inválido ou expirado.' });
  }
});

module.exports = router;