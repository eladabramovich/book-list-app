const express = require('express');
const router = express.Router();

const { protect, isAdmin } = require('../middlewares/authMiddleware');
const {
  registerUser,
  login,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router.route('/').post(registerUser);
router.route('/login').post(login);
router
  .route('/:id')
  .put(protect, isAdmin, updateUser)
  .delete(protect, isAdmin, deleteUser);

module.exports = router;
