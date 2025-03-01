// lib/firebaseAdmin.ts
import admin from "firebase-admin";

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            // This is our camelCase key for TypeScript, but we also need snake_case at runtime.
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
        } as any), // cast to any to bypass TS complaining about extra keys
    });
}

export { admin };
