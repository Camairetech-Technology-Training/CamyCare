export const BASE_URL = 'http://localhost:3000';

export const ENDPOINTS = {
    GET_PATIENTS: '/patients',
    ADD_PATIENT: '/patients'
} as const;

export type EndpointKey = keyof typeof ENDPOINTS;
