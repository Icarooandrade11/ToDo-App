const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // você pode acessar `req.user.id` depois
    next();
  } catch (error) {
    return res.status(400).json({ error: 'Token inválido.' });
  }
};

module.exports = authMiddleware;