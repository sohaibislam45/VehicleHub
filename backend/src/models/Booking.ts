import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
    userId: mongoose.Types.ObjectId;
    vehicleId: mongoose.Types.ObjectId;
    startDate: Date;
    endDate: Date;
    status: 'pending' | 'confirmed' | 'cancelled';
    totalPrice: number;
    createdAt: Date;
}

const BookingSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IBooking>('Booking', BookingSchema);
