const service = require('../services/user.service');

const createUser = async (req, res) => {
  const token = await service.createUser(req.body);

  res.status(201).json({ token });
};

const getUsers = async (req, res) => {
  const users = await service.getUsers();

  res.status(200).json(users);
};

module.exports = {
  createUser,
  getUsers,
};