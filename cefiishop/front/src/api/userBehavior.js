import api from './axiosInstance';

export const trackProductView = (userId, productId) =>
    api.post(`/user-behavior/${userId}/view/${productId}`)

export const getHomeRecommendations = (userId) =>
    api.get(`/home/recommendations/${userId}`).then(res => res.data);
