const asyncHandler = require('express-async-handler');
const Book = require('../models/Book');

// @desc    get all books details
// @route   GET /api/books
// @access  Public
const getAllBooks = asyncHandler(async (req, res) => {
  return res.status(200).json(res.advancedResults);
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
  const {
    title,
    imageUrlSmall,
    imageUrlLarge,
    description,
    generes,
  } = req.body;
  const book = await Book.create({
    title,
    images: {
      small: imageUrlSmall,
      large: imageUrlLarge,
    },
    description,
    generes,
  });
  res.status(201).json({
    success: true,
    data: book,
  });
});

// @desc    Update book info
// @route   PUT /api/books/:id
// @access  Private/Admin

const updateBook = asyncHandler(async (req, res) => {
  const bookId = req.params.id;
  const {
    title,
    imageUrlSmall,
    imageUrlLarge,
    generes,
    description,
  } = req.body;

  const book = await Book.findById(bookId);

  if (book) {
    book.title = title;
    book.images = {
      small: imageUrlSmall,
      large: imageUrlLarge,
    };
    book.generes = generes;
    book.description = description;
    const updatedBook = await book.save();
    return res.status(200).json({
      success: true,
      data: updatedBook,
    });
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Private/Admin

const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error('Book not found');
  }
  await book.remove();
  return res.status(200).json({
    success: true,
    data: {},
  });
});

module.exports = {
  getAllBooks,
  getSingleBook,
  addBook,
  updateBook,
  deleteBook,
};
