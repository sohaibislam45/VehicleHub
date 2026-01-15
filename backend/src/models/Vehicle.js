import mongoose, { Schema } from 'mongoose';
const VehicleSchema = new Schema({
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
export default mongoose.model('Vehicle', VehicleSchema);
//# sourceMappingURL=Vehicle.js.map