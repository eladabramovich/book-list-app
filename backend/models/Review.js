const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  reviewText: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);