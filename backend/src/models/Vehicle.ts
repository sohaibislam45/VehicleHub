import mongoose, { Schema, Document } from 'mongoose';

export interface IVehicle extends Document {
    ownerId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    price: number;
    category: string;
    status: 'available' | 'booked' | 'maintenance';
    images: string[];
    specs: {
        fuelType?: string;
        transmission?: string;
        seats?: number;
        [key: string]: any;
    };
    location: string;
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
    specs: { type: Map, of: Schema.Types.Mixed },
    location: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IVehicle>('Vehicle', VehicleSchema);
