const service = require('../services/user.service');

const createUser = async (req, res) => {
  const token = await service.createUser(req.body);

  res.status(201).json({ token });
};

module.exports = {
  createUser,
};