export const API_KEY = 'AIzaSyCq_US5x-HswiqwezKmFrJN0rYhka_lV30';

// Gemini API configuration
export const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
export const GEMINI_API_KEY = 'AIzaSyAjYu1wquP9lflrkFCY9zaA_Osj0Fuf258';

export function getGeminiHeaders() {
    if (!GEMINI_API_KEY) {
        throw new Error('الرجاء إضافة مفتاح API صالح في ملف apiConfig.js');
    }

    return {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY
    };
}

export const GOOGLE_ADS_API_URL = 'https://googleads.googleapis.com/v14';
export const GOOGLE_ANALYTICS_API_URL = 'https://analyticsdata.googleapis.com/v1beta';
export const GOOGLE_CLOUD_STORAGE_URL = 'https://storage.googleapis.com/v1';

export const getGoogleAdsHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
});

export const getAnalyticsHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
});
