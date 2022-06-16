const service = require('../services/user.service');

const createUser = async (req, res) => {
  const token = await service.createUser(req.body);

  res.status(201).json({ token });
};

const getUsers = async (req, res) => {
  const users = await service.getUsers();

  res.status(200).json(users);
};

const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await service.getUser(id);

  res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  await service.updateUser(req.body, id);

  delete req.body.password;

  res.status(200).json({ id, ...req.body });
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
};