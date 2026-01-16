import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { syncUser, updateProfile } from '../controllers/authController.js';

const router = express.Router();

router.post('/sync', syncUser);
router.patch('/profile', protect, updateProfile);

export default router;
