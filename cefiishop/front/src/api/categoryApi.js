import api from './axiosInstance';

export const getAllCategories = () =>
    api.get('/categories').then(res => res.data);

export const getCategoryById = (id) =>
    api.get(`/categories/${id}`).then(res => res.data);

export const getCategoryByNom = (nom) =>
    api.get('/categories/search', { params: { nom } }).then(res => res.data);
