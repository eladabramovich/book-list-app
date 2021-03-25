const express = require('express');
const router = express.Router();

const { addReview } = require('../controllers/reviewController');

router.route('/:bookId').post(addReview);

module.exports = router;
