import api from './axiosInstance';

export const getAllProducts = () =>
    api.get('/products').then(res => res.data);

export const getProductById = (id) =>
    api.get(`/products/${id}`).then(res => res.data);

export const searchProducts = (nom) =>
    api.get('/products/search', { params: { nom } }).then(res => res.data);

export const getProductsByCategory = (categoryId) =>
    api.get(`/products/category/${categoryId}`).then(res => res.data);

export const getAvailableProducts = () =>
    api.get('/products/available').then(res => res.data);

export const getProductsByCategorySortedByPrice = (categoryId) =>
    api.get(`/products/category/${categoryId}/sorted`).then(res => res.data);

export const getRecommendations = (id) =>
    api.get(`/products/${id}/recommendations`).then(res => res.data);
