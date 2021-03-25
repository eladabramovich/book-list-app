const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    images: {
      type: Map,
      of: String,
    },
    description: {
      type: String,
      required: true,
    },
    generes: {
      type: Array,
      required: true,
      maxLength: 5,
    },
    averageScore: {
      type: Number,
      default: 0.0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Book', bookSchema);
