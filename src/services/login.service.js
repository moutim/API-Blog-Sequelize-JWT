const { User } = require('../database/models');
const { generateToken } = require('../utils/JWT');

const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email, password } });

  if (!user || user.length === 0) {
    throw new Error(JSON.stringify({ status: 400, message: 'Invalid fields' }));
  }

  const token = generateToken(JSON.stringify(user));

  return token;
};

module.exports = {
  login,
};