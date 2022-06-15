const { User } = require('../database/models');
const { generateToken } = require('../utils/JWT');

const createUser = async (body) => {
  try {
    const { dataValues: { email } } = await User.create(body);

    const token = generateToken(JSON.stringify({ email }));

    return token;
  } catch (e) {
    throw new Error(JSON.stringify({ status: 500, message: e.message }));
  }
};

module.exports = {
  createUser,
};