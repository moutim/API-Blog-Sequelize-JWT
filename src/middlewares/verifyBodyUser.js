const { User } = require('../database/models');

const verifyDisplayName = (name) => {
  if (name.length < 8) {
    throw new Error(JSON.stringify(
      { status: 400, message: '"displayName" length must be at least 8 characters long' },
    ));
  }
};

const verifyEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (user) {
    throw new Error(JSON.stringify({ status: 409, message: 'User already registered' }));
  }

  const regex = /\S+@\S+\.\S+/;

  if (!regex.test(email)) {
    throw new Error(JSON.stringify({ status: 400, message: '"email" must be a valid email' }));
  }
};

const verifyPassword = (password) => {
  if (password.length < 6) {
    throw new Error(JSON.stringify(
      { status: 400, message: '"password" length must be at least 6 characters long' },
    ));
  }
};

const verifyImage = (image) => {
  if (image.length < 10) {
    throw new Error(JSON.stringify(
      { status: 400, message: '"image" length must be at least 10 characters long' },
    ));
  }
};

const verifyBodyUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  if (!displayName || !email || !password || !image) {
    throw new Error(JSON.stringify(
      { status: 400, message: 'Some required fields are missing' },
    ));
  }

  verifyDisplayName(displayName);
  verifyPassword(password);
  await verifyEmail(email);
  verifyImage(image);

  next();
};

module.exports = verifyBodyUser;