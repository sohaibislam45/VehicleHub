import mongoose, { Schema, type Document } from 'mongoose';

export interface IVehicle extends Document {
    ownerId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    price: number;
    category: string;
    status: 'available' | 'booked' | 'maintenance';
    images: string[];
    specs: {
        icon: string;
        label: string;
        value: string;
    }[];
    location: string;
    features: {
        label: string;
        icon: string;
        positive: boolean;
    }[];
    rating: number;
    reviewsCount: number;
    createdAt: Date;
}

const VehicleSchema: Schema = new Schema({
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    status: { type: String, enum: ['available', 'booked', 'maintenance'], default: 'available' },
    images: { type: [String], required: true },
    specs: [{
        icon: { type: String },
        label: { type: String },
        value: { type: String }
    }],
    location: { type: String, required: true },
    features: [{
        label: { type: String },
        icon: { type: String },
        positive: { type: Boolean, default: true }
    }],
    rating: { type: Number, default: 5 },
    reviewsCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IVehicle>('Vehicle', VehicleSchema);
