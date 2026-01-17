import mongoose, { Schema, type Document } from 'mongoose';

export interface IVehicle extends Document {
    ownerId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    category: string;
    status: 'available' | 'booked' | 'maintenance';
    performance?: string;
    range?: string;
    seats?: number;
    drive?: string;
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
    bookingCount: number;
    availableFrom?: Date;
    availableTo?: Date;
    createdAt: Date;
}

const VehicleSchema: Schema = new Schema({
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    status: { type: String, enum: ['available', 'booked', 'maintenance'], default: 'available' },
    performance: { type: String },
    range: { type: String },
    seats: { type: Number },
    drive: { type: String },
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
    bookingCount: { type: Number, default: 0 },
    availableFrom: { type: Date },
    availableTo: { type: Date },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IVehicle>('Vehicle', VehicleSchema);
