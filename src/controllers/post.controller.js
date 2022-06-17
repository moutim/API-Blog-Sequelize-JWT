const service = require('../services/post.service');

const createPost = async (req, res) => {
  const post = await service.createPost(req.body, req.headers.authorization);

  res.status(201).json(post);
};

const getPosts = async (req, res) => {
  const posts = await service.getPosts();
  console.log(posts.BlogPost);

  res.status(200).json(posts);
};

module.exports = {
  createPost,
  getPosts,
};