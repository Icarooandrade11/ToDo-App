const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 8);
  const user = new User({ name, email, password: hashed });
  await user.save();
  res.status(201).json({ message: 'Usuário criado!' });
});
module.exports = router;
