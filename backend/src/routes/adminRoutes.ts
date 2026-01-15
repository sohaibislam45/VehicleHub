import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.ts';
import User from '../models/User.ts';
import Vehicle from '../models/Vehicle.ts';
import Booking from '../models/Booking.ts';

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

// @desc Get stats
// @route GET /api/admin/stats
router.get('/stats', protect, adminOnly, async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const vehicleCount = await Vehicle.countDocuments();
        const bookingCount = await Booking.countDocuments();
        
        const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(5).populate('userId', 'name').populate('vehicleId', 'title');

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
