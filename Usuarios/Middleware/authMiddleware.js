const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log(authHeader);

  if (!token) {
    return res.status(401).json({ error: 'Token de autenticación no proporcionado' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token de autenticación inválido' });
    }
    req.body.userId = user.userId;
    next();
  });
};

module.exports = authenticateToken;
