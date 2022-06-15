const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const generateToken = (payload) => {
  const obj = JSON.parse(payload);
  return jwt.sign(obj, JWT_SECRET, jwtConfig);
};

const authenticateToken = (token) => {
  if (!token) {
    throw new Error(JSON.stringify({ status: 401, message: 'Campo token é obrigatorio.' }));
  }

  try {
    const result = jwt.verify(token, JWT_SECRET, jwtConfig);
    return result;
  } catch (e) {
    throw new Error(JSON.stringify({ status: 401, message: 'Token inválido.' }));
  }
};

module.exports = {
  generateToken,
  authenticateToken,
};