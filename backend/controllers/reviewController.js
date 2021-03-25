const asyncHandler = require('express-async-handler');
const Review = require('../models/Review');

// @desc    Add new review
// @route   POST /api/reviews/:bookId
// @access  Public
const addReview = asyncHandler(async (req, res) => {
  const bookId = req.params.bookId;
  const { userId, reviewText, score } = req.body;

  const review = await Review.create({
    book: bookId,
    author: userId,
    reviewText,
    score,
  });

  res.status(201).json(review);
});

module.exports = { addReview };
