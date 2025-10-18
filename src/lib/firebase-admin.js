import { initializeApp, getApps, cert } from 'firebase-admin/app';

let app;

export async function initializeAdminApp() {
    if (getApps().length > 0) {
        app = getApps()[0];
        return app;
    }

    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (!serviceAccount) {
        throw new Error('Missing FIREBASE_SERVICE_ACCOUNT_KEY environment variable.');
    }

    try {
        const credentials = JSON.parse(serviceAccount);
        app = initializeApp({
            credential: cert(credentials),
        });
        return app;
    } catch (e) {
        console.error('Could not parse Firebase service account credentials.', e);
        throw new Error('Invalid Firebase service account credentials.');
    }
}
