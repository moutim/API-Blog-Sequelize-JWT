const { decodeToken } = require('../utils/JWT');
const postService = require('../services/post.service');
const { User } = require('../database/models');

const verifyIdentity = async (req, res, next) => {
  const { authorization } = req.headers;
  const { id: postId } = req.params;

  const { email } = decodeToken(authorization);

  const { dataValues: { userId } } = await postService.getPost(postId);
  const { dataValues: { id } } = await User.findOne({ where: { email } });

  if (userId !== id) {
    throw new Error(JSON.stringify({ status: 401, message: 'Unauthorized user' }));
  }

  next();
};

module.exports = verifyIdentity;