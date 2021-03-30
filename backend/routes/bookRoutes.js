const express = require('express');
const router = express.Router();
const advancedResults = require('../middlewares/advancedResults');
const { protect, isAdmin } = require('../middlewares/authMiddleware');
const Book = require('../models/Book');
const {
  getAllBooks,
  getSingleBook,
  addBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');

router
  .route('/')
  .get(advancedResults(Book), getAllBooks)
  .post(protect, isAdmin, addBook);
router
  .route('/:id')
  .get(getSingleBook)
  .put(protect, isAdmin, updateBook)
  .delete(protect, isAdmin, deleteBook);

module.exports = router;
