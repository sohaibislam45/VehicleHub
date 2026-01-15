import express from 'express';
import { getVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle } from '../controllers/vehicleController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getVehicles)
    .post(protect, createVehicle);

router.route('/:id')
    .get(getVehicleById)
    .patch(protect, updateVehicle)
    .delete(protect, deleteVehicle);

export default router;
