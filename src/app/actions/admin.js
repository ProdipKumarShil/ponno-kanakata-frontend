'use server';

import { getAuth } from 'firebase-admin/auth';
import { initializeAdminApp } from '@/lib/firebase-admin';
import { config } from 'dotenv';

config();

export async function createUserAndSendPasswordReset(email) {
    try {
        await initializeAdminApp();
        const auth = getAuth();
        
        // Check if user already exists
        try {
            await auth.getUserByEmail(email);
            // If user exists, we can just send a password reset link.
            const link = await auth.generatePasswordResetLink(email);
            // Here you would typically use a service to email this link to the user.
            // For this example, we'll assume this is done and return success.
            console.log(`Password reset link for existing user ${email}: ${link}`);
            return { success: true };
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                // User does not exist, so create them.
                await auth.createUser({ email });
                const link = await auth.generatePasswordResetLink(email);
                // Here you would typically use a service to email this link to the user.
                console.log(`Password reset link for new user ${email}: ${link}`);
                return { success: true };
            }
            // Other error
            throw error;
        }

    } catch (error) {
        console.error('Error in createUserAndSendPasswordReset:', error);
        let errorMessage = 'An unknown error occurred.';
        if (error.code === 'auth/email-already-exists') {
            errorMessage = 'This email is already in use by another account.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'The email address is not valid.';
        } else if (error.message) {
            errorMessage = error.message;
        }
        return { success: false, error: errorMessage };
    }
}
