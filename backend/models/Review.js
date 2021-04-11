const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    reviewText: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ book: 1, author: 1 }, { unique: true });

reviewSchema.statics.getAverageScore = async function (bookId) {
  const obj = await this.aggregate([
    {
      $match: { book: bookId },
    },
    {
      $group: {
        _id: '$book',
        averageScore: { $avg: '$score' },
      },
    },
  ]);

  try {
    await this.model('Book').findByIdAndUpdate(bookId, {
      averageScore: obj[0].averageScore,
    });
  } catch (err) {
    console.error(err);
  }
};

reviewSchema.post('save', async function () {
  await this.constructor.getAverageScore(this.book);
});

module.exports = mongoose.model('Review', reviewSchema);
