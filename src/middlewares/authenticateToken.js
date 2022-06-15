const { verifyToken } = require('../utils/JWT');

const authenticateToken = async (req, res, next) => {
  const { authorization: token } = req.headers;

  verifyToken(token);

  next();
};

module.exports = authenticateToken;