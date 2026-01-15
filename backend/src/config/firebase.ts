import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');

if (Object.keys(serviceAccount).length > 0) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
} else {
    console.warn('Firebase Admin SDK not initialized: FIREBASE_SERVICE_ACCOUNT is missing.');
}

export default admin;
