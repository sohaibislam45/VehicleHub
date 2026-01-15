import User from '../models/User.js';
import admin from 'firebase-admin';
export const syncUser = async (req, res) => {
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
                avatar: picture || '',
                role: 'user', // Default role
            });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error('Sync Error:', error);
        res.status(500).json({ message: 'Error syncing user' });
    }
};
//# sourceMappingURL=authController.js.map