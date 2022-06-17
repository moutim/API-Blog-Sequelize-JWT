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

const verifyCategories = (categories) => {
  if (typeof categories !== 'object') {
    throw new Error(JSON.stringify(
      { status: 400, message: '"categoryIds" must be a array of numbers' },
    ));
  }
};

const verifyBodyPost = (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title || !content || !categoryIds) {
    throw new Error(JSON.stringify(
      { status: 400, message: 'Some required fields are missing' },
    ));
  }

  verifyTitle(title);
  verifyContent(content);
  verifyCategories(categoryIds);

  next();
};

module.exports = verifyBodyPost;