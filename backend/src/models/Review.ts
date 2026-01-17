import mongoose, { Schema, type Document } from 'mongoose';

export interface IReview extends Document {
    userId: mongoose.Types.ObjectId;
    vehicleId: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    createdAt: Date;
}

const ReviewSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IReview>('Review', ReviewSchema);
