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

const updatePost = async (req, res) => {
  await service.updatePost(req.body, req.params.id);
  
  const post = await service.getPost(req.params.id);

  res.status(200).json(post);
};

const deletePost = async (req, res) => {
  await service.deletePost(req.params.id);

  res.status(204).end();
};

const searchPost = async (req, res) => {
  if (!req.query.q) {
    const posts = await service.getPosts();
    res.status(200).json(posts);
  }

  const post = await service.searchPost(req.query.q);

  res.status(200).json(post);
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  searchPost,
};