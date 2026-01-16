import express from 'express';
import type { Response } from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import Vehicle from '../models/Vehicle.js';
import Booking from '../models/Booking.js';

const router = express.Router();

// @desc Get all users
// @route GET /api/admin/users
router.get('/users', protect, adminOnly, async (req: AuthRequest, res: Response) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc Update user role
// @route PATCH /api/admin/users/:id/role
router.patch('/users/:id/role', protect, adminOnly, async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        user.role = req.body.role || user.role;
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc Update user status
// @route PATCH /api/admin/users/:id/status
router.patch('/users/:id/status', protect, adminOnly, async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        // Prevent disabling self
        if (user._id.toString() === req.user?._id.toString()) {
            return res.status(400).json({ message: 'Cannot change your own status' });
        }

        user.status = req.body.status || user.status;
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc Delete user
// @route DELETE /api/admin/users/:id
router.delete('/users/:id', protect, adminOnly, async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        // Prevent deleting self
        if (user._id.toString() === req.user?._id.toString()) {
            return res.status(400).json({ message: 'Cannot delete yourself' });
        }

        await user.deleteOne();
        res.json({ message: 'User removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc Get all vehicles
// @route GET /api/admin/vehicles
router.get('/vehicles', protect, adminOnly, async (req: AuthRequest, res: Response) => {
    try {
        const vehicles = await Vehicle.find({}).populate('ownerId', 'name email photoURL');
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc Get all bookings
// @route GET /api/admin/bookings
router.get('/bookings', protect, adminOnly, async (req: AuthRequest, res: Response) => {
    try {
        const bookings = await Booking.find({})
            .populate('userId', 'name email photoURL')
            .populate('vehicleId', 'title')
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc Get stats
// @route GET /api/admin/stats
router.get('/stats', protect, adminOnly, async (req: AuthRequest, res: Response) => {
    try {
        const userCount = await User.countDocuments();
        const vehicleCount = await Vehicle.countDocuments();
        const bookingCount = await Booking.countDocuments();
        
        const recentBookings = await Booking.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('userId', 'name email photoURL')
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
