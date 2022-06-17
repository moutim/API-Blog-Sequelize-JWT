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

const verifyUpdatePost = async (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    throw new Error(JSON.stringify(
      { status: 400, message: 'Some required fields are missing' },
    ));
  }

  verifyTitle(title);
  verifyContent(content);

  next();
};

module.exports = verifyUpdatePost;