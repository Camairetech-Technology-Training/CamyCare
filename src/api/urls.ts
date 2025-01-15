export const BASE_URL = 'http://localhost:3000';

export const ENDPOINTS = {
    GET_PATIENTS: '/patients',
    ADD_PATIENT: '/patients',
    GET_PATIENTS_BY_PHARMACY: '/patients/pharmacy',

    GET_PRESCRIPTION: '/prescriptions',
    ADD_PRESCRIPTION: '/save-prescription',
    GET_PRESCRIPTIONS_BY_PHARMACY: '/prescriptions/pharmacy',

    SIGNUP_PHARMACY: '/pharmacies',
    GET_PHARMACY: '/pharmacies',
    LOGIN_PHARMACY: '/pharmacies/login'
} as const;

export type EndpointKey = keyof typeof ENDPOINTS;
