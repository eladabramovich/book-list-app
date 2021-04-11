const express = require('express');
const router = express.Router();

const { protect, isAdmin } = require('../middlewares/authMiddleware');
const advancedResults = require('../middlewares/advancedResults');
const User = require('../models/User');
const {
  registerUser,
  login,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} = require('../controllers/userController');

router
  .route('/')
  .get(protect, isAdmin, advancedResults(User), getAllUsers)
  .post(registerUser);
router.route('/login').post(login);
router
  .route('/:id')
  .get(protect, isAdmin, getUser)
  .put(protect, isAdmin, updateUser)
  .delete(protect, isAdmin, deleteUser);

module.exports = router;
