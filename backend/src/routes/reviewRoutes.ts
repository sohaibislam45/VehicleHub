import express from 'express';
import { createReview, getVehicleReviews, getFeaturedReviews } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/featured', getFeaturedReviews);
router.get('/vehicle/:vehicleId', getVehicleReviews);
router.post('/', protect, createReview);

export default router;
