const { User } = require('../database/models');
const { generateToken, decodeToken } = require('../utils/JWT');

const createUser = async (body) => {
  const user = await User.findOne({ where: { email: body.email } });

  if (user) {
    throw new Error(JSON.stringify({ status: 409, message: 'User already registered' }));
  }

  try {
    const { dataValues: { email } } = await User.create(body);

    const token = generateToken(JSON.stringify({ email }));

    return token;
  } catch (e) {
    throw new Error(JSON.stringify({ status: 500, message: e.message }));
  }
};

const getUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  if (!users) {
    throw new Error(JSON.stringify({ status: 404, message: 'Users not found' }));
  }

  return users;
};

const getUser = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error(JSON.stringify({ status: 404, message: 'User does not exist' }));
  }

  delete user.dataValues.password;

  return user;
};

const updateUser = async (body, id) => {
  try {
    await getUser(id);

    const user = await User.update(body, { where: { id } });

    return user;
  } catch (e) {
    throw new Error(JSON.stringify({ status: 500, message: e.message }));
  }
};

const deleteUser = async (authorization) => {
  const { email } = decodeToken(authorization);

  const checkUser = User.findOne({ where: { email } });
  if (!checkUser) {
    throw new Error(JSON.stringify({ status: 404, message: 'Users not found' }));
  }

  try {
    const user = await User.destroy({ where: { email } });

    return user;
  } catch (e) {
    throw new Error(JSON.stringify({ status: 500, message: e.message }));
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};