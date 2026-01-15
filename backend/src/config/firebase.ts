import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

import fs from 'fs';
import path from 'path';

let serviceAccount;

try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } else {
        const serviceAccountPath = path.resolve(process.cwd(), 'vehiclehub.json');
        if (fs.existsSync(serviceAccountPath)) {
            serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
            console.log('Firebase initialized using vehiclehub.json');
        }
    }
} catch (error) {
    console.error('Error parsing Firebase service account:', error);
}

if (serviceAccount) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
} else {
    console.warn('Firebase Admin SDK not initialized: FIREBASE_SERVICE_ACCOUNT and vehiclehub.json are missing.');
}

export default admin;
