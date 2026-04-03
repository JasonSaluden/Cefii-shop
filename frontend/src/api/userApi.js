import api from './axiosInstance';

export const getUserById = (id) =>
    api.get(`/users/${id}`).then(res => res.data);

export const updateUser = (id, userData) =>
    api.put(`/users/${id}`, userData).then(res => res.data);

export const deleteUser = (id) =>
    api.delete(`/users/${id}`).then(res => res.data);

export const getAllUsers = () =>
    api.get('/users').then(res => res.data);
