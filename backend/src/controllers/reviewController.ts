import type { Request, Response } from 'express';
import Review from '../models/Review.js';
import Vehicle from '../models/Vehicle.js';
import mongoose from 'mongoose';
import type { IUser } from '../models/User.js';

interface AuthRequest extends Request {
    user?: IUser;
}

export const createReview = async (req: AuthRequest, res: Response) => {
    try {
        const { vehicleId, rating, comment } = req.body;
        const userId = req.user?._id; // Assuming auth middleware sets req.user

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const review = new Review({
            userId,
            vehicleId,
            rating,
            comment
        });

        await review.save();

        // Update Vehicle rating and review count
        const vehicle = await Vehicle.findById(vehicleId);
        if (vehicle) {
            const reviews = await Review.find({ vehicleId: vehicleId as any });
            const totalRating = reviews.reduce((acc: number, rev: any) => acc + rev.rating, 0);
            vehicle.rating = totalRating / reviews.length;
            vehicle.reviewsCount = reviews.length;
            await vehicle.save();
        }

        const populatedReview = await review.populate('userId', 'displayName photoURL');
        res.status(201).json(populatedReview);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getVehicleReviews = async (req: Request, res: Response) => {
    try {
        const { vehicleId } = req.params;
        const reviews = await Review.find({ vehicleId: vehicleId as any })
            .populate('userId', 'displayName photoURL')
            .sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getFeaturedReviews = async (req: Request, res: Response) => {
    try {
        const reviews = await Review.find({ rating: { $gte: 4 } })
            .populate('userId', 'displayName photoURL')
            .populate('vehicleId', 'title category')
            .sort({ createdAt: -1 })
            .limit(6);
        res.json(reviews);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
