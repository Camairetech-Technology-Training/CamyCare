export const getHeaders = (): Record<string, string> => {
    const token = localStorage.getItem('authToken');
    return {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
    };
};
