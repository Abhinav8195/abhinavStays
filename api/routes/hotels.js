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

// Create
router.post('/', verifyAdmin, createHotel);

// Update
router.put('/:id', verifyAdmin, updateHotel);

// Delete
router.delete('/:id', verifyAdmin, deleteHotel);

// Get
router.get('/find/:id', getHotel);

// Get all
router.get('/', getHotels);

router.get('/countByCity', countByCity);

router.get('/countByType', countByType);
router.get("/room/:id" , getHotelRooms)

module.exports = router;
