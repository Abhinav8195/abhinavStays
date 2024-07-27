const express = require('express');
const {
    createRoom,
    updateRoom,
    deleteRoom,
    getRoom,
    getRooms,
    updateRoomAvailability
} = require('../controllers/room');
const { verifyAdmin } = require('../utils/verifyToken');

const router = express.Router();

// Create
router.post('/:hotelid', verifyAdmin, createRoom);

// Update
router.put('/:id', verifyAdmin, updateRoom);
router.put('/availability/:id', updateRoomAvailability);

// Delete
router.delete('/:id/:hotelid', verifyAdmin, deleteRoom);

// Get
router.get('/:id', getRoom);

// Get all
router.get('/', getRooms);

module.exports = router;
