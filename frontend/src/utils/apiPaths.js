export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const API_PATHS = {
    AUTH:{
        REGISTER: '/api/auth/register',
        LOGIN: '/api/auth/login',
        GOOGLE: '/api/auth/google',
        PROFILE: '/api/auth/profile',
    },
    GENERATE_NOTES: '/api/generate',
}