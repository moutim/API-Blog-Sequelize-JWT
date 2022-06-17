const { decodeToken } = require('../utils/JWT');
const postService = require('../services/post.service');
const { User } = require('../database/models');

const verifyTitle = (title) => {
  if (title.length < 3) {
    throw new Error(JSON.stringify(
      { status: 400, message: '"title" length must be at least 3 characters long' },
    ));
  }
};

const verifyContent = (content) => {
  if (content.length < 5) {
    throw new Error(JSON.stringify(
      { status: 400, message: '"content" length must be at least 5 characters long' },
    ));
  }
};

const verifyIdentity = async (postId, authorization) => {
  const { email } = decodeToken(authorization);

  const { dataValues: { userId } } = await postService.getPost(postId);
  const { dataValues: { id } } = await User.findOne({ where: { email } });

  if (userId !== id) {
    throw new Error(JSON.stringify({ status: 401, message: 'Unauthorized user' }));
  }
};

const verifyUpdatePost = async (req, res, next) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const { title, content } = req.body;

  if (!title || !content) {
    throw new Error(JSON.stringify(
      { status: 400, message: 'Some required fields are missing' },
    ));
  }

  verifyTitle(title);
  verifyContent(content);
  await verifyIdentity(id, authorization);

  next();
};

module.exports = verifyUpdatePost;