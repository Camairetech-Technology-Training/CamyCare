import axios, { Method } from 'axios';
import { getHeaders } from './headers';

interface ApiCallParams<T = any> {
    url: string;
    method: Method;
    data?: T;
    requiresAuth?: boolean;
}

export const apiCall = async <T, R = any>({ url, method, data, requiresAuth = false }: ApiCallParams<T>): Promise<R> => {
    try {
        const headers = requiresAuth ? getHeaders() : {};
        const response = await axios({
            url,
            method,
            data,
            headers,
        });
        return response.data as R;
    } catch (error: any) {
        console.error('API call error:', error.response || error.message);
        throw error.response?.data || error.message;
    }
};
