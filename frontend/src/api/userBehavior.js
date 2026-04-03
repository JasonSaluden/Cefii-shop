// Contient les fonctions pour les appels API liés au comportement utilisateur (suivi des vues de produits, recommandations personnalisées, etc.)
import api from './axiosInstance';

export const trackProductView = (userId, productId) =>
    api.post(`/user-behavior/${userId}/view/${productId}`)

export const getHomeRecommendations = (userId) =>
    api.get(`/home/recommendations/${userId}`).then(res => res.data);
