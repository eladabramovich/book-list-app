const { json } = require('express');
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

// @desc    Get all reviews by book Id
// @route   GET /api/reviews/:bookId
// @access  Public

const getAllReviews = asyncHandler(async (req, res) => {
  const bookId = req.params.bookId;
  const reviews = await Review.find({ book: bookId });

  if (reviews) {
    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } else {
    res.status(404);
    throw new Error('No reviews for book found');
  }
});

module.exports = { addReview, getAllReviews };
