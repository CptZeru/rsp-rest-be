const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../middleware/auth');
const roomController = require('../controllers/room.controller');

router.post('/', authMiddleware, roomController.createRoom);
router.get('/', authMiddleware, roomController.getListRooms);

module.exports = router;
