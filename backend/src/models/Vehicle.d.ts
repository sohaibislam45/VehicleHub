import mongoose, { type Document } from 'mongoose';
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
declare const _default: mongoose.Model<IVehicle, {}, {}, {}, mongoose.Document<unknown, {}, IVehicle, {}, mongoose.DefaultSchemaOptions> & IVehicle & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IVehicle>;
export default _default;
//# sourceMappingURL=Vehicle.d.ts.map