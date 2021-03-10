const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

const getTokenExpiryDate = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.exp;
};

module.exports = { generateToken, getTokenExpiryDate };
