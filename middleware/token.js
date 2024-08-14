const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, 'jo68tnijofj5s23am7u84eu81');

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token de autenticação inválido' });
  }
}

module.exports = authMiddleware;