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
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
            return res.status(400).json({ message: 'Invalid vehicle ID' });
        }

        const review = new Review({
            userId,
            vehicleId,
            rating,
            comment
        });

        await review.save();

        // Update Vehicle rating and review count
        const reviews = await Review.find({ vehicleId });
        const totalRating = reviews.reduce((acc: number, rev: any) => acc + rev.rating, 0);
        
        await Vehicle.findByIdAndUpdate(vehicleId, {
            rating: reviews.length > 0 ? totalRating / reviews.length : 5,
            reviewsCount: reviews.length
        });

        const populatedReview = await review.populate('userId', 'name photoURL');
        res.status(201).json(populatedReview);
    } catch (error: any) {
        console.error("Create Review Error:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getVehicleReviews = async (req: Request, res: Response) => {
    try {
        const { vehicleId } = req.params;
        if (!vehicleId || !mongoose.Types.ObjectId.isValid(vehicleId as string)) {
            return res.status(400).json({ message: 'Invalid vehicle ID' });
        }
        const reviews = await Review.find({ vehicleId: vehicleId as any })
            .populate('userId', 'name photoURL')
            .sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getFeaturedReviews = async (req: Request, res: Response) => {
    try {
        const reviews = await Review.find({ rating: { $gte: 4 } })
            .populate('userId', 'name photoURL')
            .populate('vehicleId', 'title category')
            .sort({ createdAt: -1 })
            .limit(6);
        res.json(reviews);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
