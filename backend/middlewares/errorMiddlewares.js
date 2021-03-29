const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = '';

  if (err.code === 11000) {
    message = 'Unique Field';
  } else {
    message = err.message;
  }

  res.status(statusCode);
  res.json({
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
