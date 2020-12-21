const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../middleware/auth');
const bookController = require('../controllers/book.controller');

router.post('/', authMiddleware, bookController.bookRoom);
router.post('/check/in', authMiddleware, bookController.checkInBookedRoom);

module.exports = router;
