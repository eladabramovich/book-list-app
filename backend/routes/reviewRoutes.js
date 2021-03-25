const express = require('express');
const router = express.Router();

const { addReview, getAllReviews } = require('../controllers/reviewController');

router.route('/:bookId').get(getAllReviews).post(addReview);

module.exports = router;
