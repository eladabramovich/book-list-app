const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getSingleBook,
  addBook,
} = require('../controllers/bookController');

router.route('/').get(getAllBooks).post(addBook);
router.route('/:id').get(getSingleBook);

module.exports = router;
