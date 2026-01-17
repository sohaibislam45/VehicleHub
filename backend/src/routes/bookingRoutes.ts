import express from 'express';
import { createBooking, getMyBookings, updateBookingStatus, createCheckoutSession, stripeWebhook } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, createBooking);

router.route('/my')
    .get(protect, getMyBookings);

router.post('/create-checkout-session', protect, createCheckoutSession);
router.post('/webhook', stripeWebhook);

router.route('/:id/status')
    .patch(protect, updateBookingStatus);

export default router;
