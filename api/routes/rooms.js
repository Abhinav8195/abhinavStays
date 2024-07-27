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
//verify admin
router.post('/:hotelid', createRoom);

// Update
//verifyadmin in 1 
router.put('/:id', updateRoom);
router.put('/availability/:id', updateRoomAvailability);

// Delete
//verifyadmin
router.delete('/:id/:hotelid', deleteRoom);

// Get
router.get('/:id', getRoom);

// Get all
router.get('/', getRooms);

module.exports = router;
