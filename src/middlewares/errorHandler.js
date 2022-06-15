const errorHandler = (error, req, res, next) => {
  try {
    const erro = JSON.parse(error.message);
    res.status(erro.status).json({ message: erro.message });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }

  next();
};

module.exports = errorHandler;