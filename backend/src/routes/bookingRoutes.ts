import express from 'express';
import { createBooking, getMyBookings } from '../controllers/bookingController.ts';
import { protect } from '../middleware/authMiddleware.ts';

const router = express.Router();

router.route('/')
    .post(protect, createBooking);

router.route('/my')
    .get(protect, getMyBookings);

export default router;
