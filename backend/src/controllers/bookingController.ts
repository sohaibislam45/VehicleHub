import type { Response } from 'express';
import Booking from '../models/Booking.js';
import Vehicle from '../models/Vehicle.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';

// @desc Create a booking
// @route POST /api/bookings
export const createBooking = async (req: AuthRequest, res: Response) => {
    try {
        const { vehicleId, startDate, endDate, totalPrice } = req.body;

        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

        const booking = await Booking.create({
            userId: req.user._id,
            vehicleId,
            startDate,
            endDate,
            totalPrice,
            status: 'pending'
        });

        // Increment vehicle booking count
        vehicle.bookingCount = (vehicle.bookingCount || 0) + 1;
        await vehicle.save();

        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: 'Invalid booking data' });
    }
};

// @desc Get user bookings
// @route GET /api/bookings/my
export const getMyBookings = async (req: AuthRequest, res: Response) => {
    try {
        const bookings = await Booking.find({ userId: req.user._id }).populate('vehicleId');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc Update booking status
// @route PATCH /api/bookings/:id/status
export const updateBookingStatus = async (req: AuthRequest, res: Response) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        booking.status = req.body.status || booking.status;
        await booking.save();
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
