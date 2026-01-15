import type { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import User from '../models/User.js';

export interface AuthRequest extends Request {
    user?: any;
    firebaseUid?: string;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decodedToken = await admin.auth().verifyIdToken(token as string);
            req.firebaseUid = decodedToken.uid;
            
            // Find user in MongoDB
            const user = await User.findOne({ firebaseId: decodedToken.uid });
            if (!user) {
                return res.status(401).json({ message: 'User not found in system' });
            }
            req.user = user;
            next();
        } catch (error) {
            console.error('Auth Error:', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};
