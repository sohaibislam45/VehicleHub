import mongoose, { Schema } from 'mongoose';
const BookingSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('Booking', BookingSchema);
//# sourceMappingURL=Booking.js.map