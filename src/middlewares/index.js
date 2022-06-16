const errorHandler = require('./errorHandler');
const verirfyBodyLogin = require('./verifyBodyLogin');
const verifyBodyUser = require('./verifyBodyUser');
const authenticateToken = require('./authenticateToken');
const verifyBodyCategories = require('./verifyBodyCategories');

module.exports = {
  errorHandler,
  verirfyBodyLogin,
  verifyBodyUser,
  authenticateToken,
  verifyBodyCategories,
};