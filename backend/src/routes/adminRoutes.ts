import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import Vehicle from '../models/Vehicle.js';
import Booking from '../models/Booking.js';

const router = express.Router();

// @desc Get all users
// @route GET /api/admin/users
router.get('/users', protect, adminOnly, async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc Get all vehicles
// @route GET /api/admin/vehicles
router.get('/vehicles', protect, adminOnly, async (req, res) => {
    try {
        const vehicles = await Vehicle.find({}).populate('ownerId', 'name email');
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc Get all bookings
// @route GET /api/admin/bookings
router.get('/bookings', protect, adminOnly, async (req, res) => {
    try {
        const bookings = await Booking.find({})
            .populate('userId', 'name email')
            .populate('vehicleId', 'title')
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc Get stats
// @route GET /api/admin/stats
router.get('/stats', protect, adminOnly, async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const vehicleCount = await Vehicle.countDocuments();
        const bookingCount = await Booking.countDocuments();
        
        const recentBookings = await Booking.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('userId', 'name email')
            .populate('vehicleId', 'title price');

        res.json({
            users: userCount,
            vehicles: vehicleCount,
            bookings: bookingCount,
            recentBookings
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
