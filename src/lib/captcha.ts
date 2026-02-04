// Google reCAPTCHA v3 Integration

declare global {
    interface Window {
        grecaptcha?: {
            ready: (callback: () => void) => void;
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
        };
    }
}

export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Test key by default

// Load reCAPTCHA script
export const loadRecaptcha = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (window.grecaptcha) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
            window.grecaptcha?.ready(() => {
                resolve();
            });
        };

        script.onerror = () => {
            reject(new Error('Failed to load reCAPTCHA'));
        };

        document.head.appendChild(script);
    });
};

// Execute reCAPTCHA and get token
export const executeRecaptcha = async (action: string = 'submit'): Promise<string> => {
    try {
        await loadRecaptcha();

        if (!window.grecaptcha) {
            throw new Error('reCAPTCHA not loaded');
        }

        const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
        return token;
    } catch (error) {
        console.error('reCAPTCHA execution error:', error);
        throw error;
    }
};

// Verify reCAPTCHA token on the backend (this is a helper type)
export interface RecaptchaVerifyRequest {
    token: string;
    action?: string;
}

export interface RecaptchaVerifyResponse {
    success: boolean;
    score: number;
    action: string;
    challenge_ts: string;
    hostname: string;
    'error-codes'?: string[];
}

// Hook for easy reCAPTCHA integration
import { useState, useEffect } from 'react';

export function useRecaptcha() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        loadRecaptcha()
            .then(() => setIsLoaded(true))
            .catch((err) => setError(err));
    }, []);

    const execute = async (action: string = 'submit') => {
        try {
            const token = await executeRecaptcha(action);
            return token;
        } catch (err) {
            setError(err as Error);
            throw err;
        }
    };

    return {
        isLoaded,
        error,
        execute,
    };
}
