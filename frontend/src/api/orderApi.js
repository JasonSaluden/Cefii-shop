// Contient les fonctions pour les appels API liés aux commandes (créer une commande, récupérer une commande par ID, etc.)
import api from './axiosInstance';

export const createOrder = (userId, orderData) =>
    api.post(`/orders/users/${userId}`, orderData).then(res => res.data);

export const getOrderById = (id) =>
    api.get(`/orders/${id}`).then(res => res.data);

export const getUserOrders = (userId) =>
    api.get(`/orders/users/${userId}`).then(res => res.data);

export const getAllOrders = () =>
    api.get('/orders').then(res => res.data);

export const updateOrderStatus = (id, status) =>
    api.put(`/orders/${id}/status`, { status }).then(res => res.data);

export const deleteOrder = (id) =>
    api.delete(`/orders/${id}`).then(res => res.data);
