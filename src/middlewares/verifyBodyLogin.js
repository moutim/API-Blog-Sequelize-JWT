const verifyEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;

  if (!email) {
    throw new Error(JSON.stringify({ status: 400, message: 'Some required fields are missing' }));
  }

  if (!regex.test(email)) {
    throw new Error(JSON.stringify({ status: 400, message: 'Email in incorrect format' }));
  }
};

const verifyPassword = (password) => {
  if (!password) {
    throw new Error(JSON.stringify({ status: 400, message: 'Some required fields are missing' }));
  }

  if (password.length < 3) {
    throw new Error(JSON.stringify(
      { status: 400, message: 'password must be 3 or more characters' },
    ));
  }
};

const verifyBodyLogin = (req, res, next) => {
  const { email, password } = req.body;

  verifyEmail(email);
  verifyPassword(password);

  next();
};

module.exports = verifyBodyLogin;