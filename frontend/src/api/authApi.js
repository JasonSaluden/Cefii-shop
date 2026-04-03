import api from './axiosInstance';

export const login = (credentials) =>
    api.post('/auth/login', credentials).then(res => res.data);

export const register = (payload) =>
    api.post('/auth/register', payload).then(res => res.data);
