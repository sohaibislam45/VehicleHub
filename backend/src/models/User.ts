import mongoose, { Schema, type Document } from 'mongoose';

export interface IUser extends Document {
    firebaseId: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
    avatar?: string;
    createdAt: Date;
}

const UserSchema: Schema = new Schema({
    firebaseId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    avatar: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>('User', UserSchema);
