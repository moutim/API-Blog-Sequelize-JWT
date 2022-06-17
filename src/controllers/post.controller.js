const service = require('../services/post.service');

const createPost = async (req, res) => {
  const post = await service.createPost(req.body, req.headers.authorization);

  res.status(201).json(post);
};

const getPosts = async (req, res) => {
  const posts = await service.getPosts();

  res.status(200).json(posts);
};

const getPost = async (req, res) => {
  const { id } = req.params;
  const post = await service.getPost(id);

  res.status(200).json(post);
};

module.exports = {
  createPost,
  getPosts,
  getPost,
};