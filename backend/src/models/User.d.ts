import mongoose, { type Document } from 'mongoose';
export interface IUser extends Document {
    firebaseId: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
    photoURL?: string;
    createdAt: Date;
}
declare const _default: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
export default _default;
//# sourceMappingURL=User.d.ts.map