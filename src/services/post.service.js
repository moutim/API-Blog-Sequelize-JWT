const Sequelize = require('sequelize');
const { BlogPost, User, Category, PostCategory } = require('../database/models');
const { decodeToken } = require('../utils/JWT');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const verifyCategories = async (categories) => {
  const validate = await Promise.all(
    categories.map(async (c) => {
      const category = await Category.findByPk(c);
      if (!category) return false;
      return true;
    }),
  );

  return validate;
};

const getCurrentTime = () => {
  // https://www.kindacode.com/article/javascript-get-current-date-time-in-yyyy-mm-dd-hh-mm-ss-format/
  const dateObj = new Date();
  const year = dateObj.getFullYear();

  let month = dateObj.getMonth();
  month = (`0${month}`).slice(-2);

  let date = dateObj.getDate();
  date = (`0${date}`).slice(-2);

  let hour = dateObj.getHours();
  hour = (`0${hour}`).slice(-2);

  let minute = dateObj.getMinutes();
  minute = (`0${minute}`).slice(-2);

  let second = dateObj.getSeconds();
  second = (`0${second}`).slice(-2);

  const time = `${year}/${month}/${date} ${hour}:${minute}:${second}`;
  return time;
};

const getUserId = async (authorization) => {
  const { email } = decodeToken(authorization);
  const { dataValues: { id: userId } } = await User.findOne({ where: { email } });

  return userId;
};

const createInsertPostCategory = (postId, categories) => categories.map((category) => ({
  postId, categoryId: category,
}));

const managedTransaction = async (data) => {
  const { userId, title, content, categoryIds } = data;

  try {
    const result = await sequelize.transaction(async (t) => {
      const post = await BlogPost.create(
        { userId, title, content, published: getCurrentTime(), updated: getCurrentTime() }, 
        { transaction: t },
      );

      const insertsPostCategory = createInsertPostCategory(post.null, categoryIds);
      await PostCategory.bulkCreate(insertsPostCategory, { transaction: t });

      post.dataValues.id = post.null;
      return post;
    });

    return result;
  } catch (e) {
    throw new Error(JSON.stringify({ status: 500, message: e.message }));
  }
};

const createPost = async (body, authorization) => {
  const { title, content, categoryIds } = body;

  const validateCategories = await verifyCategories(categoryIds);
  if (validateCategories.includes(false)) {
    throw new Error(JSON.stringify({ status: 400, message: '"categoryIds" not found' }));
  }

  const userId = await getUserId(authorization);

  const result = await managedTransaction({ userId, title, content, categoryIds });

  return result;
};

const getPosts = () => {
  const posts = BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category,
        as: 'categories',
        attributes: ['id', 'name'],
        // https://stackoverflow.com/questions/30082625/cant-exclude-associations-fields-from-select-statement-in-sequelize
        through: {
        attributes: [],
        }, 
      },
    ],
  });

  return posts;
};

const getPost = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category,
        as: 'categories',
        attributes: ['id', 'name'],
        // https://stackoverflow.com/questions/30082625/cant-exclude-associations-fields-from-select-statement-in-sequelize
        through: {
        attributes: [],
        }, 
      },
    ],
  });

  if (!post) {
    throw new Error(JSON.stringify({ status: 404, message: 'Post does not exist' }));
  }

  return post;
};

module.exports = {
  createPost,
  getPosts,
  getPost,
};