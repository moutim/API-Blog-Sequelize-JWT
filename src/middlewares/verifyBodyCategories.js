const verifyBodyCategories = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    throw new Error(JSON.stringify({ status: 400, message: '"name" is required' }));
  }

  if (name.length < 3) {
    throw new Error(JSON.stringify(
      { status: 400, message: '"name" must be 3 or more characters' },
    ));
  }
  
  next();
};

module.exports = verifyBodyCategories;