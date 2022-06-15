const service = require('../services/login.service');

const login = async (req, res) => {
  const token = await service.login(req.body);

  res.status(200).json({ token });
};

module.exports = {
  login,
};