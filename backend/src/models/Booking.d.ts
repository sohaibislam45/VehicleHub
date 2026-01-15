import mongoose, { type Document } from 'mongoose';
export interface IBooking extends Document {
    userId: mongoose.Types.ObjectId;
    vehicleId: mongoose.Types.ObjectId;
    startDate: Date;
    endDate: Date;
    status: 'pending' | 'confirmed' | 'cancelled';
    totalPrice: number;
    createdAt: Date;
}
declare const _default: mongoose.Model<IBooking, {}, {}, {}, mongoose.Document<unknown, {}, IBooking, {}, mongoose.DefaultSchemaOptions> & IBooking & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IBooking>;
export default _default;
//# sourceMappingURL=Booking.d.ts.map