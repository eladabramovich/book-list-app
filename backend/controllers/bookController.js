const asyncHandler = require('express-async-handler');
const Book = require('../models/Book');

// @desc    get all books details
// @route   GET /api/books
// @access  Public
const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({});
  res.status(200).json(books);
});

// @desc    get single book's details
// @route   GET /api/books/:id
// @access  Public
const getSingleBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

// @desc    add a new book
// @route   POST /api/books/
// @access  Private/Admin

const addBook = asyncHandler(async (req, res) => {
  const { title, imageUrlSmall, imageUrlLarge, description, generes } = req.body;
  const book = await Book.create({
    title,
    images: {
      small: imageUrlSmall,
      large: imageUrlLarge
    },
    description,
    generes,
  });
  res.status(201).json({
    success: true,
    book: book,
  });
});

module.exports = {
  getAllBooks,
  getSingleBook,
  addBook,
};
