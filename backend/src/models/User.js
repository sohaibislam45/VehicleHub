import mongoose, { Schema } from 'mongoose';
const UserSchema = new Schema({
    firebaseId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    avatar: { type: String },
    createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('User', UserSchema);
//# sourceMappingURL=User.js.map