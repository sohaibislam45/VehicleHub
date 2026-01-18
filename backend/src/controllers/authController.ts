import type { Request, Response } from 'express';
import User from '../models/User.js';
import admin from '../config/firebase.js';

export const syncUser = async (req: Request, res: Response) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const { uid, email, name, picture } = decodedToken;

        let user = await User.findOne({ firebaseId: uid });

        if (!user) {
            user = await User.create({
                firebaseId: uid,
                email: email || '',
                name: name || 'User',
                photoURL: picture || '',
                role: 'user', // Default role
            });
        } else {
            // Update existing user with latest info from Firebase
            user.name = name || user.name;
            user.photoURL = picture || user.photoURL || '';
            await user.save();
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Sync Error:', error);
        res.status(500).json({ message: 'Error syncing user' });
    }
};

export const updateProfile = async (req: any, res: Response) => {
    try {
        const userId = req.user._id;
        const updates = req.body;

        // Rename displayName from frontend to name for backend
        if (updates.displayName) {
            updates.name = updates.displayName;
            delete updates.displayName;
        }

        // Prevent updating sensitive fields
        delete updates.firebaseId;
        delete updates.email;
        delete updates.role;

        const user = await User.findByIdAndUpdate(userId, updates, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Update Profile Error:', error);
        res.status(500).json({ message: 'Error updating profile' });
    }
};
