const express = require('express');
const {
    createHotel,
    updateHotel,
    deleteHotel,
    getHotel,
    getHotels,
    countByCity,
    countByType,
    getHotelRooms
} = require('../controllers/hotel');
const { verifyAdmin } = require('../utils/verifyToken');

const router = express.Router();
//from top3 i have removed verifyAdmin for testing
// Create
router.post('/', createHotel);

// Update
router.put('/:id', updateHotel);

// Delete
router.delete('/:id', deleteHotel);

// Get
router.get('/find/:id', getHotel);

// Get all
router.get('/', getHotels);

router.get('/countByCity', countByCity);

router.get('/countByType', countByType);
router.get("/room/:id" , getHotelRooms)

module.exports = router;
