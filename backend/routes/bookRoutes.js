const express = require('express');
const router = express.Router();
const advancedResults = require('../middlewares/advancedResults');
const Book = require('../models/Book');
const {
  getAllBooks,
  getSingleBook,
  addBook,
} = require('../controllers/bookController');

router.route('/').get(advancedResults(Book), getAllBooks).post(addBook);
router.route('/:id').get(getSingleBook);

module.exports = router;
