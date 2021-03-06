const errorHandler = require('./errorHandler');
const verirfyBodyLogin = require('./verifyBodyLogin');
const verifyBodyUser = require('./verifyBodyUser');
const authenticateToken = require('./authenticateToken');
const verifyBodyCategories = require('./verifyBodyCategories');
const verifyBodyPost = require('./verifyBodyPost');
const verifyUpdatePost = require('./verifyUpdatePost');
const verifyIdentity = require('./verifyIdentity');

module.exports = {
  errorHandler,
  verirfyBodyLogin,
  verifyBodyUser,
  authenticateToken,
  verifyBodyCategories,
  verifyBodyPost,
  verifyUpdatePost,
  verifyIdentity,
};